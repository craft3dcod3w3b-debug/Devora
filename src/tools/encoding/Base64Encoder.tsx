import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';

export default function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }

    try {
      // Use btoa for ascii, but handle unicode safely
      const encoded = btoa(
        encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_match, p1) =>
          String.fromCharCode(Number('0x' + p1))
        )
      );
      setOutput(encoded);
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to encode to Base64');
      }
    }
  }, [input]);

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'encoded.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <TwoPanelLayout>
      <CodeEditor
        value={input}
        onChange={setInput}
        title="Plain Text Input"
        language="Text"
        placeholder="Type or paste text to encode..."
        onFileUpload={setInput}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        <CodeEditor
          value={error ? '' : output}
          readOnly
          title="Base64 Output"
          language="Base64"
          placeholder={error ? 'Fix errors to see output' : 'Base64 encoded string will appear here...'}
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
  );
}
