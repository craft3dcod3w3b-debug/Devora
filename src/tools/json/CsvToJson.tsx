import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import Select from '../../components/ui/Select';
import { Settings2 } from 'lucide-react';

function parseCSV(text: string, delimiter: string) {
  const result: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;
  let currentLine = 1;
  let quoteStartLine = 1;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        cell += '"';
        i++; // skip next quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        cell += char;
        if (char === '\n') {
          currentLine++;
        }
      }
    } else {
      if (char === '"') {
        inQuotes = true;
        quoteStartLine = currentLine;
      } else if (char === delimiter) {
        row.push(cell);
        cell = '';
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        row.push(cell);
        result.push(row);
        row = [];
        cell = '';
        currentLine++;
        if (char === '\r') i++; // skip \n
      } else {
        cell += char;
      }
    }
  }

  if (inQuotes) {
    throw new Error(`Unclosed quoted field at line ${quoteStartLine}.`);
  }

  // Push last cell/row
  if (cell !== '' || row.length > 0) {
    row.push(cell);
    result.push(row);
  }

  return result;
}

export default function CsvToJson() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [delimiter, setDelimiter] = useState('auto');
  const [hasHeader, setHasHeader] = useState(true);
  const [minify, setMinify] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      // Auto-detect delimiter if requested
      let actualDelimiter = delimiter;
      if (delimiter === 'auto') {
        const firstLine = input.split('\n')[0] || '';
        const counts = { ',': 0, ';': 0, '\t': 0, '|': 0 };
        for (const c of firstLine) {
          if (c in counts) counts[c as keyof typeof counts]++;
        }
        actualDelimiter = Object.keys(counts).reduce((a, b) => counts[a as keyof typeof counts] > counts[b as keyof typeof counts] ? a : b);
        if (counts[actualDelimiter as keyof typeof counts] === 0) actualDelimiter = ','; // default
      }

      const parsedRows = parseCSV(input, actualDelimiter);
      
      if (parsedRows.length === 0) {
        throw new Error('No valid CSV data found');
      }

      let finalJson: any;

      if (hasHeader) {
        const headers = parsedRows[0] || [];
        const dataRows = parsedRows.slice(1);
        finalJson = dataRows.map(row => {
          const obj: any = {};
          headers.forEach((header, index) => {
            let val: any = row[index] || '';
            if (val !== '' && !isNaN(Number(val))) {
              val = Number(val);
            } else if (typeof val === 'string') {
              if (val.toLowerCase() === 'true') {
                val = true;
              } else if (val.toLowerCase() === 'false') {
                val = false;
              }
            }
            obj[header.trim()] = val;
          });
          return obj;
        });
      } else {
        // Return array of arrays if no headers
        finalJson = parsedRows.map(row => 
          row.map(val => {
            if (val !== '' && !isNaN(Number(val))) return Number(val);
            if (typeof val === 'string') {
              if (val.toLowerCase() === 'true') return true;
              if (val.toLowerCase() === 'false') return false;
            }
            return val;
          })
        );
      }

      setOutput(JSON.stringify(finalJson, null, minify ? undefined : 2));
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to parse CSV');
      }
    }
  }, [input, delimiter, hasHeader, minify]);

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-fg-secondary)' }}>
          <Settings2 size={18} />
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Options:</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.8125rem' }}>Delimiter:</label>
          <Select
            value={delimiter}
            onChange={(val) => setDelimiter(val)}
            options={[
              { label: 'Auto-detect', value: 'auto' },
              { label: 'Comma (,)', value: ',' },
              { label: 'Semicolon (;)', value: ';' },
              { label: 'Tab', value: '\t' },
              { label: 'Pipe (|)', value: '|' },
            ]}
            style={{ width: '150px', height: '2.25rem' }}
          />
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={hasHeader}
            onChange={(e) => setHasHeader(e.target.checked)}
          />
          First row is header
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={minify}
            onChange={(e) => setMinify(e.target.checked)}
          />
          Minify output
        </label>
      </div>

      <TwoPanelLayout>
        <CodeEditor
          value={input}
          onChange={setInput}
          title="CSV Input"
          language="CSV"
          placeholder="Paste CSV data here..."
          onFileUpload={setInput}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
          <CodeEditor
            value={error ? '' : output}
            readOnly
            title="JSON Output"
            language="JSON"
            placeholder={error ? 'Fix errors to see output' : 'JSON output will appear here...'}
            onDownload={output && !error ? handleDownload : undefined}
          />
          {error && (
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--color-error-light)',
                color: 'var(--color-error)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                border: '1px solid var(--color-error)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Error: {error}
            </div>
          )}
        </div>
      </TwoPanelLayout>
    </div>
  );
}
