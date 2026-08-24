import { useState, useMemo } from 'react';
import CodeEditor from '../../components/ui/CodeEditor';
import { AlertTriangle } from 'lucide-react';

export default function JwtDecoder() {
  const [input, setInput] = useState('');

  const decoded = useMemo(() => {
    if (!input.trim()) return null;

    try {
      const parts = input.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT — JWT must contain exactly 3 parts.');
      }

      const decodeBase64Url = (str: string) => {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        while (output.length % 4) {
          output += '=';
        }
        const decodedString = window.atob(output);
        try {
          return new TextDecoder().decode(new Uint8Array([...decodedString].map(c => c.charCodeAt(0))));
        } catch (e) {
          return decodedString;
        }
      };

      let headerJson;
      try {
        const headerRaw = decodeBase64Url(parts[0]!);
        headerJson = JSON.stringify(JSON.parse(headerRaw), null, 2);
      } catch (e) {
        throw new Error('Invalid JWT — Unable to decode JWT header.');
      }

      let payloadJson;
      try {
        const payloadRaw = decodeBase64Url(parts[1]!);
        payloadJson = JSON.stringify(JSON.parse(payloadRaw), null, 2);
      } catch (e) {
        throw new Error('Invalid JWT — Unable to decode JWT payload.');
      }

      return {
        header: headerJson,
        payload: payloadJson,
        isVerified: false,
        signature: parts[2] || '',
        error: null,
      };
    } catch (err: any) {
      return {
        header: '',
        payload: '',
        signature: '',
        isVerified: false,
        error: err.message || 'Invalid JWT token',
      };
    }
  }, [input]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-warning)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        <AlertTriangle style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: '2px' }} size={20} />
        <div>
          <h4 style={{ color: 'var(--color-warning)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Security Notice</h4>
          <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', lineHeight: 1.5 }}>
            Decoding a JWT does <strong>NOT</strong> verify its signature. Anyone can decode and view the contents of a JWT. Never trust a decoded payload in a production environment without cryptographically verifying the signature on the backend. This tool runs entirely in your browser; your tokens are never sent to any server.
          </p>
        </div>
      </div>

      <div style={{ height: '150px', width: '100%' }}>
        <CodeEditor
          value={input}
          onChange={setInput}
          title="Raw JWT"
          placeholder="Paste your JWT here (e.g. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
          language="JavaScript"
          wrap={true}
          minHeight="150px"
        />
      </div>

      {decoded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {decoded.error ? (
            <div style={{ color: 'var(--color-error)', padding: '1rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-error)' }}>
              <strong>Error decoding token:</strong> {decoded.error}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                <CodeEditor
                  value={decoded.header}
                  readOnly
                  title="Header (Algorithm & Type)"
                  language="JSON"
                  wrap={false}
                  minHeight="200px"
                />
              </div>
              <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                <CodeEditor
                  value={decoded.payload}
                  readOnly
                  title="Payload (Data)"
                  language="JSON"
                  wrap={false}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
