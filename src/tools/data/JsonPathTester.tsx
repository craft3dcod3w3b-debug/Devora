import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import { JSONPath } from 'jsonpath-plus';
import { Search } from 'lucide-react';

export default function JsonPathTester() {
  const [input, setInput] = useState('{\n  "store": {\n    "book": [\n      {\n        "category": "reference",\n        "author": "Nigel Rees",\n        "title": "Sayings of the Century",\n        "price": 8.95\n      },\n      {\n        "category": "fiction",\n        "author": "Evelyn Waugh",\n        "title": "Sword of Honour",\n        "price": 12.99\n      }\n    ],\n    "bicycle": {\n      "color": "red",\n      "price": 19.95\n    }\n  }\n}');
  const [path, setPath] = useState('$.store.book[*].author');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      if (!path.trim()) {
        setOutput('');
        setError('');
        return;
      }
      
      try {
        const result = JSONPath({ path, json: parsed });
        setOutput(JSON.stringify(result, null, 2));
        setError('');
      } catch (err) {
        if (err instanceof Error) {
          setError(`Invalid JSONPath: ${err.message}`);
        } else {
          setError('Invalid JSONPath expression.');
        }
        setOutput('');
      }
    } catch (err) {
      setError('Invalid JSON input data.');
      setOutput('');
    }
  }, [input, path]);

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
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
          <Search size={18} color="var(--color-fg-secondary)" />
          <input
            type="text"
            className="input"
            placeholder="Enter JSONPath expression (e.g. $.store.book[*].author)..."
            value={path}
            onChange={(e) => setPath(e.target.value)}
            style={{ flex: 1, padding: '0.5rem 0.75rem' }}
          />
        </div>
      </div>

      <TwoPanelLayout>
        <CodeEditor
          value={input}
          onChange={setInput}
          title="JSON Input"
          language="JSON"
          placeholder="Paste JSON data here..."
          onFileUpload={setInput}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
          <CodeEditor
            value={error ? '' : output}
            readOnly
            title="JSONPath Results"
            language="JSON"
            placeholder={error ? 'Fix errors to see output' : 'JSONPath results will appear here...'}
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
    </div>
  );
}
