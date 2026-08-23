import { useState, useEffect } from 'react';
import { SinglePanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function JsonValidator() {
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!input.trim()) {
      setIsValid(null);
      setError('');
      return;
    }

    try {
      JSON.parse(input);
      setIsValid(true);
      setError('');
    } catch (err) {
      setIsValid(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid JSON');
      }
    }
  }, [input]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Validation Status Bar */}
      {isValid !== null && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            backgroundColor: isValid ? 'var(--color-success-light)' : 'var(--color-error-light)',
            color: isValid ? 'var(--color-success)' : 'var(--color-error)',
            borderRadius: 'var(--radius-md)',
            border: `1px solid ${isValid ? 'var(--color-success)' : 'var(--color-error)'}`,
          }}
        >
          {isValid ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>
              {isValid ? 'Valid JSON' : 'Invalid JSON'}
            </h3>
            {error && (
              <p style={{ fontSize: '0.875rem', margin: '0.25rem 0 0', fontFamily: 'var(--font-mono)' }}>
                {error}
              </p>
            )}
          </div>
        </div>
      )}

      <SinglePanelLayout>
        <div style={{ height: '500px' }}>
          <CodeEditor
            value={input}
            onChange={setInput}
            title="JSON Input"
            language="JSON"
            placeholder="Paste JSON here to validate..."
            onFileUpload={setInput}
          />
        </div>
      </SinglePanelLayout>
    </div>
  );
}
