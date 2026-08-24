import { useState, useCallback } from 'react';
import { Copy, Check, Download, RefreshCw } from 'lucide-react';


function generateString(length: number, charset: string): string {
  if (!charset) return '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (v) => charset[v % charset.length]).join('');
}

export default function RandomStringGenerator() {
  const [length, setLength] = useState(32);
  const [count, setCount] = useState(5);
  const [charOptions, setCharOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    hex: false,
  });
  const [customChars, setCustomChars] = useState('');
  const [strings, setStrings] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const getCharset = useCallback((): string => {
    if (customChars) return customChars;
    if (charOptions.hex) return '0123456789abcdef';
    let charset = '';
    if (charOptions.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (charOptions.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (charOptions.numbers) charset += '0123456789';
    return charset || 'abcdefghijklmnopqrstuvwxyz';
  }, [charOptions, customChars]);

  const generate = useCallback(() => {
    const charset = getCharset();
    const newStrings: string[] = [];
    for (let i = 0; i < count; i++) {
      newStrings.push(generateString(length, charset));
    }
    setStrings(newStrings);
    setCopiedIndex(null);
    setCopiedAll(false);
  }, [length, count, getCharset]);

  const copyOne = async (str: string, index: number) => {
    await navigator.clipboard.writeText(str);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(strings.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([strings.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'random_strings.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleOption = (key: string) => {
    if (key === 'hex') {
      setCharOptions({ uppercase: false, lowercase: false, numbers: false, hex: true });
      setCustomChars('');
    } else {
      setCharOptions((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev], hex: false }));
    }
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
        {/* Length */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, minWidth: '5rem' }}>Length: {length}</label>
          <input type="range" min={1} max={256} value={length} onChange={(e) => setLength(Number(e.target.value))} style={{ flex: 1, accentColor: 'var(--color-primary)' }} />
          <input type="number" min={1} max={256} value={length} onChange={(e) => setLength(Math.max(1, Math.min(256, Number(e.target.value))))} className="input" style={{ width: '4.5rem', height: '2rem', textAlign: 'center' }} />
        </div>

        {/* Charset toggles */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {Object.keys(charOptions).map((key) => (
            <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={charOptions[key as keyof typeof charOptions]} onChange={() => toggleOption(key)} />
              {key === 'hex' ? 'Hex (0-9, a-f)' : key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>

        {/* Custom charset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, minWidth: '7rem' }}>Custom chars:</label>
          <input
            type="text"
            value={customChars}
            onChange={(e) => { setCustomChars(e.target.value); }}
            className="input"
            placeholder="e.g. ABC123!@#"
            style={{ flex: 1, height: '2.25rem' }}
          />
        </div>

        {/* Count + actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Count:</label>
            <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))} className="input" style={{ width: '4.5rem', height: '2rem', textAlign: 'center' }} />
          </div>
          <button onClick={generate} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RefreshCw size={16} /> Generate
          </button>
          {strings.length > 0 && (
            <>
              <button onClick={copyAll} className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: copiedAll ? 'var(--color-success)' : undefined }}>
                {copiedAll ? <Check size={16} /> : <Copy size={16} />} {copiedAll ? 'Copied!' : 'Copy All'}
              </button>
              <button onClick={handleDownload} className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Download size={16} /> Download
              </button>
            </>
          )}
        </div>
      </div>

      {/* Results */}
      {strings.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.375rem',
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '0.75rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {strings.map((str, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-code-bg)',
                border: '1px solid var(--color-border)',
                gap: '0.75rem',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-code-fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, userSelect: 'all' }}>
                {str}
              </span>
              <button onClick={() => copyOne(str, i)} className="btn btn-ghost btn-sm" style={{ padding: '0.25rem', color: copiedIndex === i ? 'var(--color-success)' : 'var(--color-fg-secondary)', flexShrink: 0 }} title="Copy">
                {copiedIndex === i ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-fg-muted)', fontSize: '0.9375rem', backgroundColor: 'var(--color-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          Click "Generate" to create random strings
        </div>
      )}
    </div>
  );
}
