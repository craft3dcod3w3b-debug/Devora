import { useState, useMemo } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import Select from '../../components/ui/Select';

export default function CsvViewer() {
  const [input, setInput] = useState('id,name,email,role\n1,John Doe,john@example.com,Admin\n2,Jane Smith,jane@example.com,User\n3,Bob Johnson,bob@example.com,Editor');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);

  const parsedData = useMemo(() => {
    if (!input.trim()) return [];
    
    // Simple CSV parser that handles quotes
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentCell = '';
    let inQuotes = false;
    
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const nextChar = input[i + 1];
      
      if (char === '"' && inQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // skip next quote
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === delimiter && !inQuotes) {
        currentRow.push(currentCell);
        currentCell = '';
      } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
        currentRow.push(currentCell);
        rows.push(currentRow);
        currentRow = [];
        currentCell = '';
        if (char === '\r') i++;
      } else {
        currentCell += char;
      }
    }
    
    // Add the last cell/row if not empty
    if (currentCell !== '' || currentRow.length > 0) {
      currentRow.push(currentCell);
      rows.push(currentRow);
    }
    
    return rows;
  }, [input, delimiter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-fg-secondary)' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Delimiter:</span>
        </div>
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
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem', color: 'var(--color-fg-secondary)', fontSize: '0.875rem' }}>
          <input
            type="checkbox"
            checked={hasHeader}
            onChange={(e) => setHasHeader(e.target.checked)}
            style={{ accentColor: 'var(--color-primary)' }}
          />
          First row is header
        </label>
      </div>

      <TwoPanelLayout>
        <CodeEditor
          value={input}
          onChange={setInput}
          title="CSV Input"
          language="Text"
          placeholder="Paste CSV data here..."
          onFileUpload={setInput}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
          <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-fg)' }}>
            Data Viewer
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: '0' }}>
            {parsedData.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                {hasHeader && parsedData[0] && (
                  <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-secondary)', zIndex: 1, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                    <tr>
                      {parsedData[0].map((header, i) => (
                        <th key={i} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)', color: 'var(--color-fg)', fontWeight: 600 }}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {parsedData.slice(hasHeader ? 1 : 0).map((row, rowIndex) => (
                    <tr key={rowIndex} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} style={{ padding: '0.75rem 1rem', color: 'var(--color-fg-secondary)' }}>
                          {cell}
                        </td>
                      ))}
                      {/* Pad missing columns if row is shorter than header */}
                      {hasHeader && parsedData[0] && row.length < parsedData[0].length && (
                        Array.from({ length: parsedData[0].length - row.length }).map((_, i) => (
                          <td key={`empty-${i}`} style={{ padding: '0.75rem 1rem' }}></td>
                        ))
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-fg-muted)', fontSize: '0.875rem' }}>
                No data to display
              </div>
            )}
          </div>
        </div>
      </TwoPanelLayout>
    </div>
  );
}
