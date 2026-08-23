import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import bcrypt from 'bcryptjs';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';

export default function BcryptGenerator() {
  const [input, setInput] = useState('password123');
  const [rounds, setRounds] = useState(10);
  const [hash, setHash] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [verifyInput, setVerifyInput] = useState('');
  const [verifyHash, setVerifyHash] = useState('');
  const [isMatch, setIsMatch] = useState<boolean | null>(null);

  const generateHash = () => {
    if (!input) return;
    setIsGenerating(true);
    // Use setTimeout to allow UI to update before heavy sync operation
    setTimeout(() => {
      try {
        const salt = bcrypt.genSaltSync(rounds);
        const result = bcrypt.hashSync(input, salt);
        setHash(result);
      } catch (err) {
        setHash('Error generating hash');
      } finally {
        setIsGenerating(false);
      }
    }, 10);
  };

  useEffect(() => {
    generateHash();
  }, []); // Initial run only

  useEffect(() => {
    if (!verifyInput || !verifyHash) {
      setIsMatch(null);
      return;
    }
    try {
      const match = bcrypt.compareSync(verifyInput, verifyHash.trim());
      setIsMatch(match);
    } catch (err) {
      setIsMatch(false);
    }
  }, [verifyInput, verifyHash]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
      
      {/* Generate Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-fg)' }}>Generate Bcrypt Hash</h3>
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
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Cost / Rounds:</span>
          </div>
          <input
            type="number"
            min={4}
            max={15}
            value={rounds}
            onChange={(e) => { setRounds(Number(e.target.value) || 10); setHash(''); }}
            className="input"
            style={{ width: '80px', padding: '0.25rem 0.75rem', height: '2rem' }}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)' }}>Higher cost = slower generation = better security (Default: 10)</span>
          
          <button
            onClick={generateHash}
            disabled={isGenerating || !input}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto', opacity: isGenerating ? 0.7 : 1 }}
          >
            <RefreshCw size={16} className={isGenerating ? "animate-spin" : ""} />
            {isGenerating ? 'Hashing...' : 'Generate Hash'}
          </button>
        </div>

        <TwoPanelLayout minHeight="150px">
          <div style={{ flex: 1, minHeight: '120px' }}>
            <CodeEditor
              value={input}
              onChange={(val) => { setInput(val); setHash(''); }}
              title="Plain Text Password"
              language="Text"
              placeholder="Enter password to hash..."
            />
          </div>
          <div style={{ flex: 1, minHeight: '120px' }}>
            <CodeEditor
              value={hash}
              readOnly
              title="Bcrypt Hash"
              language="Text"
              placeholder={input && !hash ? "Click 'Generate Hash' to generate..." : "Generated hash will appear here..."}
            />
          </div>
        </TwoPanelLayout>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)' }} />

      {/* Verify Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-fg)' }}>Verify Bcrypt Hash</h3>
        
        <div 
          style={{ 
            padding: '1rem', 
            backgroundColor: isMatch === true ? 'var(--color-success-light)' : isMatch === false ? 'var(--color-error-light)' : 'var(--color-bg-secondary)',
            color: isMatch === true ? 'var(--color-success)' : isMatch === false ? 'var(--color-error)' : 'var(--color-fg-muted)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid',
            borderColor: isMatch === true ? 'var(--color-success)' : isMatch === false ? 'var(--color-error)' : 'var(--color-border)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '1.125rem'
          }}
        >
          {isMatch === true ? <CheckCircle /> : isMatch === false ? <XCircle /> : null}
          {isMatch === true ? 'Match! The password matches the hash.' : isMatch === false ? 'No Match. The password does not match the hash.' : 'Enter a password and hash below to verify.'}
        </div>

        <TwoPanelLayout minHeight="150px">
          <div style={{ flex: 1, minHeight: '120px' }}>
            <CodeEditor
              value={verifyInput}
              onChange={setVerifyInput}
              title="Password to Verify"
              language="Text"
              placeholder="Enter plain text password..."
            />
          </div>
          <div style={{ flex: 1, minHeight: '120px' }}>
            <CodeEditor
              value={verifyHash}
              onChange={setVerifyHash}
              title="Bcrypt Hash"
              language="Text"
              placeholder="Enter bcrypt hash to verify against..."
            />
          </div>
        </TwoPanelLayout>
      </div>

    </div>
  );
}
