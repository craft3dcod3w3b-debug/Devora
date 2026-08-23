import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import Select from '../../components/ui/Select';
import { Settings2 } from 'lucide-react';

function flattenObject(ob: any, prefix = false): any {
  let toReturn: any = {};
  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if ((typeof ob[i]) === 'object' && ob[i] !== null && !Array.isArray(ob[i])) {
      let flatObject = flattenObject(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[prefix ? `${i}.${x}` : x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

export default function JsonToCsv() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [flatten, setFlatten] = useState(true);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      let parsed = JSON.parse(input);
      
      // Enforce strict validation: must be an array
      if (!Array.isArray(parsed)) {
        throw new Error('Input must be a JSON array of objects.');
      }

      // Enforce strict validation: every item must be a JSON object
      for (const item of parsed) {
        if (typeof item !== 'object' || item === null || Array.isArray(item)) {
          throw new Error('Every item in the JSON array must be an object.');
        }
      }

      if (parsed.length === 0) {
        setOutput('');
        setError('');
        return;
      }

      // Flatten objects if option is checked
      const processedArray = flatten ? parsed.map((item: any) => flattenObject(item, true)) : parsed;

      // Extract all unique headers
      const headers = new Set<string>();
      processedArray.forEach((item: any) => {
        if (typeof item === 'object' && item !== null) {
          Object.keys(item).forEach(key => headers.add(key));
        }
      });
      const headerArray = Array.from(headers);

      // Create CSV rows
      const rows = [];
      
      // 1. Header row
      rows.push(headerArray.map(h => escapeCsv(h, delimiter)).join(delimiter));

      // 2. Data rows
      processedArray.forEach((item: any) => {
        const row = headerArray.map(header => {
          let val = item?.[header];
          if (val === null || val === undefined) return '';
          if (typeof val === 'object') val = JSON.stringify(val);
          return escapeCsv(String(val), delimiter);
        });
        rows.push(row.join(delimiter));
      });

      setOutput(rows.join('\n'));
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message.startsWith('Unexpected') ? 'Invalid JSON syntax.' : err.message);
      } else {
        setError('Invalid JSON syntax.');
      }
    }
  }, [input, delimiter, flatten]);

  const escapeCsv = (str: string, d: string) => {
    if (str.includes(d) || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.csv';
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
            checked={flatten}
            onChange={(e) => setFlatten(e.target.checked)}
          />
          Flatten nested objects
        </label>
      </div>

      <TwoPanelLayout>
        <CodeEditor
          value={input}
          onChange={setInput}
          title="JSON Input"
          language="JSON"
          placeholder="Paste JSON array here..."
          onFileUpload={setInput}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
          <CodeEditor
            value={error ? '' : output}
            readOnly
            title="CSV Output"
            language="CSV"
            placeholder={error ? 'Fix errors to see output' : 'CSV output will appear here...'}
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
