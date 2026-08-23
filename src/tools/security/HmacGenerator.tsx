import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import { KeyRound, ShieldCheck } from 'lucide-react';
import Select from '../../components/ui/Select';
import CryptoJS from 'crypto-js';

type HmacAlgo = 'MD5' | 'SHA1' | 'SHA256' | 'SHA512';

export default function HmacGenerator() {
  const [message, setMessage] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [algo, setAlgo] = useState<HmacAlgo>('SHA256');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!message || !secretKey) {
      setOutput('');
      return;
    }

    try {
      let hash;
      switch (algo) {
        case 'MD5':
          hash = CryptoJS.HmacMD5(message, secretKey);
          break;
        case 'SHA1':
          hash = CryptoJS.HmacSHA1(message, secretKey);
          break;
        case 'SHA256':
          hash = CryptoJS.HmacSHA256(message, secretKey);
          break;
        case 'SHA512':
          hash = CryptoJS.HmacSHA512(message, secretKey);
          break;
        default:
          return;
      }
      setOutput(hash.toString());
    } catch (err) {
      setOutput('Error generating HMAC signature.');
    }
  }, [message, secretKey, algo]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '200px' }}>
          <KeyRound size={18} color="var(--color-fg-secondary)" />
          <input
            type="text"
            className="input"
            placeholder="Enter secret key..."
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            style={{ flex: 1, padding: '0.5rem 0.75rem' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={18} color="var(--color-fg-secondary)" />
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-fg-secondary)' }}>Algorithm:</span>
          <Select
            value={algo}
            onChange={(val) => setAlgo(val as HmacAlgo)}
            options={[
              { label: 'HMAC-MD5', value: 'MD5' },
              { label: 'HMAC-SHA1', value: 'SHA1' },
              { label: 'HMAC-SHA256', value: 'SHA256' },
              { label: 'HMAC-SHA512', value: 'SHA512' },
            ]}
            style={{ width: '160px', height: '2.25rem' }}
          />
        </div>
      </div>

      <TwoPanelLayout>
        <CodeEditor
          value={message}
          onChange={setMessage}
          title="Message Input"
          language="Text"
          placeholder="Type or paste the message to sign here..."
          onFileUpload={setMessage}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
          <CodeEditor
            value={output}
            readOnly
            title={`HMAC Output (${algo})`}
            language="Text"
            placeholder={!secretKey ? 'Enter a secret key above to generate the signature.' : 'HMAC signature will appear here...'}
          />
        </div>
      </TwoPanelLayout>
    </div>
  );
}
