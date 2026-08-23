import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import CryptoJS from 'crypto-js';

export default function Md5HashGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // If input is empty, null, undefined, or missing
    if (!input) {
      setOutput('');
      setError('');
      return;
    }
    
    // Explicitly reject non-string types (even though CodeEditor usually provides strings)
    if (typeof input !== 'string') {
      setOutput('');
      setError('Invalid input: Input must be a valid string.');
      return;
    }

    try {
      const hash = CryptoJS.MD5(input).toString();
      setOutput(hash);
      setError('');
    } catch (err) {
      setOutput('');
      setError('Error generating MD5 hash.');
    }
  }, [input]);

  return (
    <TwoPanelLayout>
      <CodeEditor
        value={input}
        onChange={setInput}
        title="Input String"
        language="Text"
        placeholder="Type or paste string here to generate MD5 hash..."
        onFileUpload={setInput}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        <CodeEditor
          value={error ? '' : output}
          readOnly
          title="MD5 Output"
          language="Text"
          placeholder={error ? 'Fix errors to see output' : 'MD5 hash will appear here...'}
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
