import { useState, useCallback } from 'react';
import { Copy, Check, Download, RefreshCw } from 'lucide-react';

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = useCallback(() => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(crypto.randomUUID());
    }
    setUuids(newUuids);
    setCopiedIndex(null);
    setCopiedAll(false);
  }, [count]);

  const copyOne = async (uuid: string, index: number) => {
    await navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uuids.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem 1.25rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Count:</label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
            className="input"
            style={{ width: '5rem', height: '2.25rem', textAlign: 'center' }}
          />
        </div>

        <button onClick={generate} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <RefreshCw size={16} />
          Generate
        </button>

        {uuids.length > 0 && (
          <>
            <button
              onClick={copyAll}
              className="btn btn-ghost"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: copiedAll ? 'var(--color-success)' : undefined }}
            >
              {copiedAll ? <Check size={16} /> : <Copy size={16} />}
              {copiedAll ? 'Copied!' : 'Copy All'}
            </button>
            <button onClick={handleDownload} className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Download size={16} />
              Download
            </button>
          </>
        )}
      </div>

      {/* Results */}
      {uuids.length > 0 && (
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
          {uuids.map((uuid, i) => (
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
                }}
              >
                {uuid}
              </span>
              <button
                onClick={() => copyOne(uuid, i)}
                className="btn btn-ghost btn-sm"
                style={{ padding: '0.25rem', color: copiedIndex === i ? 'var(--color-success)' : 'var(--color-fg-secondary)', flexShrink: 0 }}
                title="Copy"
              >
                {copiedIndex === i ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          ))}
        </div>
      )}

      {uuids.length === 0 && (
        <div
          style={{
            padding: '3rem',
            textAlign: 'center',
            color: 'var(--color-fg-muted)',
            fontSize: '0.9375rem',
            backgroundColor: 'var(--color-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
          }}
        >
          Click "Generate" to create UUIDs
        </div>
      )}
    </div>
  );
}
