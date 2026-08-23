import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import CryptoJS from 'crypto-js';

export default function ShaHashGenerator() {
  const [input, setInput] = useState('');
  const [sha1, setSha1] = useState('');
  const [sha256, setSha256] = useState('');
  const [sha512, setSha512] = useState('');

  useEffect(() => {
    if (!input) {
      setSha1('');
      setSha256('');
      setSha512('');
      return;
    }
    
    setSha1(CryptoJS.SHA1(input).toString());
    setSha256(CryptoJS.SHA256(input).toString());
    setSha512(CryptoJS.SHA512(input).toString());
  }, [input]);

  return (
    <TwoPanelLayout>
      <CodeEditor
        value={input}
        onChange={setInput}
        title="Input String"
        language="Text"
        placeholder="Type or paste string here to generate SHA hashes..."
        onFileUpload={setInput}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', overflowY: 'auto', paddingRight: '0.25rem' }}>
        <div style={{ flex: '1 1 auto', minHeight: '120px' }}>
          <CodeEditor
            value={sha1}
            readOnly
            title="SHA-1"
            language="Text"
            placeholder="SHA-1 hash will appear here..."
          />
        </div>
        <div style={{ flex: '1 1 auto', minHeight: '120px' }}>
          <CodeEditor
            value={sha256}
            readOnly
            title="SHA-256"
            language="Text"
            placeholder="SHA-256 hash will appear here..."
          />
        </div>
        <div style={{ flex: '1 1 auto', minHeight: '120px' }}>
          <CodeEditor
            value={sha512}
            readOnly
            title="SHA-512"
            language="Text"
            placeholder="SHA-512 hash will appear here..."
          />
        </div>
      </div>
    </TwoPanelLayout>
  );
}
