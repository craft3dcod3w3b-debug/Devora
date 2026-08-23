import { useState, useCallback, useEffect } from 'react';
import { Copy, Check, Download, RefreshCw, Eye, EyeOff } from 'lucide-react';

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

function generatePassword(length: number, options: Record<string, boolean>): string {
  let charset = '';
  if (options.uppercase) charset += CHARSETS.uppercase;
  if (options.lowercase) charset += CHARSETS.lowercase;
  if (options.numbers) charset += CHARSETS.numbers;
  if (options.symbols) charset += CHARSETS.symbols;
  if (!charset) charset = CHARSETS.lowercase;

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (v) => charset[v % charset.length]).join('');
}

function getStrength(password: string): { label: string; color: string; percent: number } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { label: 'Weak', color: 'var(--color-error)', percent: 25 };
  if (score <= 3) return { label: 'Fair', color: 'var(--color-warning)', percent: 50 };
  if (score <= 4) return { label: 'Strong', color: '#059669', percent: 75 };
  return { label: 'Very Strong', color: 'var(--color-success)', percent: 100 };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(true);

  const generate = useCallback(() => {
    const newPasswords: string[] = [];
    for (let i = 0; i < count; i++) {
      newPasswords.push(generatePassword(length, options));
    }
    setPasswords(newPasswords);
    setCopiedIndex(null);
  }, [length, options, count]);

  // Auto-generate on first render
  useEffect(() => {
    generate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const copyOne = async (pw: string, index: number) => {
    await navigator.clipboard.writeText(pw);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([passwords.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'passwords.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleOption = (key: string) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Controls */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1.25rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
        }}
      >
        {/* Length slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, minWidth: '4.5rem' }}>Length: {length}</label>
          <input
            type="range"
            min={4}
            max={128}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--color-primary)' }}
          />
          <input
            type="number"
            min={4}
            max={128}
            value={length}
            onChange={(e) => setLength(Math.max(4, Math.min(128, Number(e.target.value))))}
            className="input"
            style={{ width: '4.5rem', height: '2rem', textAlign: 'center' }}
          />
        </div>

        {/* Character options */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {Object.keys(options).map((key) => (
            <label
              key={key}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}
            >
              <input
                type="checkbox"
                checked={options[key as keyof typeof options]}
                onChange={() => toggleOption(key)}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>

        {/* Count + actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Count:</label>
            <input
              type="number"
              min={1}
              max={20}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value))))}
              className="input"
              style={{ width: '4.5rem', height: '2rem', textAlign: 'center' }}
            />
          </div>

          <button onClick={generate} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RefreshCw size={16} />
            Generate
          </button>

          <button
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-ghost"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPassword ? 'Hide' : 'Show'}
          </button>

          {passwords.length > 0 && (
            <button onClick={handleDownload} className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Download size={16} />
              Download
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.75rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {passwords.map((pw, i) => {
          const strength = getStrength(pw);
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.625rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-code-bg)',
                  border: '1px solid var(--color-border)',
                  gap: '0.75rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.875rem',
                    color: 'var(--color-code-fg)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    userSelect: 'all',
                    letterSpacing: showPassword ? undefined : '0.25em',
                  }}
                >
                  {showPassword ? pw : '•'.repeat(Math.min(pw.length, 32))}
                </span>
                <button
                  onClick={() => copyOne(pw, i)}
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '0.25rem', color: copiedIndex === i ? 'var(--color-success)' : 'var(--color-fg-secondary)', flexShrink: 0 }}
                  title="Copy"
                >
                  {copiedIndex === i ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
              {/* Strength bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.25rem' }}>
                <div style={{ flex: 1, height: '4px', borderRadius: '2px', backgroundColor: 'var(--color-border)', overflow: 'hidden' }}>
                  <div style={{ width: `${strength.percent}%`, height: '100%', borderRadius: '2px', backgroundColor: strength.color, transition: 'width 0.3s ease' }} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: strength.color, minWidth: '5rem' }}>{strength.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
