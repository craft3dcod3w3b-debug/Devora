import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';

export default function SqlToJson() {
  const [input, setInput] = useState('INSERT INTO users (id, name, email, age) VALUES (1, "John Doe", "john@example.com", 30);\nINSERT INTO users (id, name, email, age) VALUES (2, "Jane Smith", "jane@example.com", 25);');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const result = parseSqlInsert(input);
      if (result.length > 0) {
        setOutput(JSON.stringify(result, null, 2));
        setError('');
      } else {
        setOutput('');
        setError('No valid INSERT statements found. Please provide standard SQL INSERT statements.');
      }
    } catch (err) {
      setOutput('');
      if (err instanceof Error) {
        setError(`Error parsing SQL: ${err.message}`);
      } else {
        setError('Error parsing SQL.');
      }
    }
  }, [input]);

  // Extremely basic SQL INSERT parser
  function parseSqlInsert(sql: string) {
    const results: any[] = [];
    
    // Match INSERT INTO table (col1, col2) VALUES (val1, val2)
    const regex = /INSERT\s+INTO\s+([a-zA-Z0-9_`]+)\s*\(([^)]+)\)\s*VALUES\s*\(([^;]+)\)/gi;
    let match;

    while ((match = regex.exec(sql)) !== null) {
      const columns = match[2]!.split(',').map(c => c.trim().replace(/[`'"]/g, ''));
      
      // Parse values carefully avoiding commas inside strings
      const valuesStr = match[3]!;
      const values: any[] = [];
      let currentVal = '';
      let inString = false;
      let stringChar = '';
      
      for (let i = 0; i < valuesStr.length; i++) {
        const char = valuesStr[i];
        
        if ((char === "'" || char === '"') && !inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar && inString) {
          if (valuesStr[i+1] === stringChar) {
            currentVal += char;
            i++; // skip escaped quote
          } else {
            inString = false;
            stringChar = '';
          }
        } else if (char === ',' && !inString) {
          values.push(parseValue(currentVal.trim()));
          currentVal = '';
        } else {
          currentVal += char;
        }
      }
      
      if (currentVal.trim() !== '') {
        values.push(parseValue(currentVal.trim()));
      }
      
      // Map columns to values
      const row: any = {};
      columns.forEach((col, idx) => {
        row[col] = values[idx];
      });
      
      results.push(row);
    }

    return results;
  }

  function parseValue(val: string) {
    if (val.toUpperCase() === 'NULL') return null;
    if (val.toUpperCase() === 'TRUE') return true;
    if (val.toUpperCase() === 'FALSE') return false;
    
    const num = Number(val);
    if (!isNaN(num) && val !== '') return num;
    
    return val;
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sql-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <TwoPanelLayout>
      <CodeEditor
        value={input}
        onChange={setInput}
        title="SQL Input (INSERT Statements)"
        language="SQL"
        placeholder="Paste SQL INSERT statements here..."
        onFileUpload={setInput}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        <CodeEditor
          value={error ? '' : output}
          readOnly
          title="JSON Output"
          language="JSON"
          placeholder={error ? 'Fix errors to see output' : 'JSON will appear here...'}
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
            {error}
          </div>
        )}
      </div>
    </TwoPanelLayout>
  );
}
