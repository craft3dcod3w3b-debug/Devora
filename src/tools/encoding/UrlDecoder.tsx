import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';

export default function UrlDecoder() {
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
      const decoded = decodeURIComponent(input.replace(/\+/g, ' '));
      setOutput(decoded);
      setError('');
    } catch (err) {
      setError('Malformed URI sequence');
    }
  }, [input]);

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'url_decoded.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <TwoPanelLayout>
      <CodeEditor
        value={input}
        onChange={setInput}
        title="URL Encoded Input"
        language="URL Encoded"
        placeholder="Paste URL encoded string to decode..."
        onFileUpload={setInput}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        <CodeEditor
          value={error ? '' : output}
          readOnly
          title="Plain Text Output"
          language="Text"
          placeholder={error ? 'Fix errors to see output' : 'Decoded plain text will appear here...'}
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
