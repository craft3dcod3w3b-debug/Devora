import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import Ajv from 'ajv';

export default function JsonSchemaValidator() {
  const [schemaStr, setSchemaStr] = useState('{\n  "type": "object",\n  "properties": {\n    "name": { "type": "string" },\n    "age": { "type": "number", "minimum": 0 }\n  },\n  "required": ["name", "age"]\n}');
  const [dataStr, setDataStr] = useState('{\n  "name": "John Doe",\n  "age": 30\n}');
  const [output, setOutput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!schemaStr.trim() || !dataStr.trim()) {
      setOutput('');
      setIsValid(null);
      return;
    }

    try {
      const schema = JSON.parse(schemaStr);
      const data = JSON.parse(dataStr);
      
      const ajv = new Ajv();
      const validate = ajv.compile(schema);
      const valid = validate(data);
      
      if (valid) {
        setIsValid(true);
        setOutput('JSON is valid according to the schema.');
      } else {
        setIsValid(false);
        setOutput(JSON.stringify(validate.errors, null, 2));
      }
    } catch (err) {
      setIsValid(false);
      if (err instanceof Error) {
        setOutput(`Parse Error: ${err.message}`);
      } else {
        setOutput('Parse Error: Invalid JSON syntax.');
      }
    }
  }, [schemaStr, dataStr]);

  return (
    <TwoPanelLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
        <div style={{ flex: 1, minHeight: '200px' }}>
          <CodeEditor
            value={schemaStr}
            onChange={setSchemaStr}
            title="JSON Schema"
            language="JSON"
            placeholder="Paste JSON Schema here..."
            onFileUpload={setSchemaStr}
          />
        </div>
        <div style={{ flex: 1, minHeight: '200px' }}>
          <CodeEditor
            value={dataStr}
            onChange={setDataStr}
            title="JSON Data"
            language="JSON"
            placeholder="Paste JSON Data here..."
            onFileUpload={setDataStr}
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div 
          style={{ 
            padding: '1rem', 
            backgroundColor: isValid === true ? 'var(--color-success-light)' : isValid === false ? 'var(--color-error-light)' : 'var(--color-bg-secondary)',
            color: isValid === true ? 'var(--color-success)' : isValid === false ? 'var(--color-error)' : 'var(--color-fg-muted)',
            borderBottom: '1px solid var(--color-border)',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {isValid === true ? '✅ Validation Passed' : isValid === false ? '❌ Validation Failed' : 'Waiting for input...'}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--color-bg-tertiary)', padding: '1rem' }}>
          {output ? (
            <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
              {output}
            </pre>
          ) : (
            <div style={{ color: 'var(--color-fg-muted)', fontSize: '0.875rem' }}>
              Validation results will appear here...
            </div>
          )}
        </div>
      </div>
    </TwoPanelLayout>
  );
}
