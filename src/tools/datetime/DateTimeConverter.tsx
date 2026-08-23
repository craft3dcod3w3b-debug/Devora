import { useState, useMemo } from 'react';
import { SinglePanelLayout } from '../../components/layout/ToolLayout';
import { CalendarClock, Copy, Check } from 'lucide-react';

export default function DateTimeConverter() {
  const [inputDate, setInputDate] = useState(() => new Date().toISOString());

  const parsedDate = useMemo(() => {
    if (!inputDate.trim()) return null;
    
    const d = new Date(inputDate);
    if (isNaN(d.getTime())) return null;
    
    return d;
  }, [inputDate]);

  const DateFormatRow = ({ label, value }: { label: string, value: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {}
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted-foreground)', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <code style={{ fontSize: '1rem', color: 'var(--color-foreground)', fontFamily: 'monospace', wordBreak: 'break-all' }}>{value}</code>
          <button onClick={handleCopy} className="button button-ghost" style={{ padding: '0.5rem', flexShrink: 0 }}>
            {copied ? <Check size={16} style={{ color: 'var(--color-success)' }} /> : <Copy size={16} />}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SinglePanelLayout>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-foreground)' }}>
              <CalendarClock size={20} style={{ color: 'var(--color-primary)' }} />
              Date/Time String to Parse
            </label>
            <input
              type="text"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="input"
              style={{ width: '100%', fontFamily: 'monospace', fontSize: '1rem' }}
              placeholder="e.g. 2024-12-31T23:59:00Z, Dec 31, 2024, 12/31/2024"
            />
            {inputDate.trim() && !parsedDate && (
              <div style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Invalid date format. Cannot parse this string.
              </div>
            )}
          </div>

          {parsedDate && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <DateFormatRow label="ISO 8601" value={parsedDate.toISOString()} />
              <DateFormatRow label="UTC String" value={parsedDate.toUTCString()} />
              <DateFormatRow label="Local Date/Time" value={parsedDate.toString()} />
              <DateFormatRow label="Local Date String" value={parsedDate.toLocaleDateString()} />
              <DateFormatRow label="Local Time String" value={parsedDate.toLocaleTimeString()} />
              <DateFormatRow label="Unix Timestamp (seconds)" value={Math.floor(parsedDate.getTime() / 1000).toString()} />
              <DateFormatRow label="Unix Timestamp (milliseconds)" value={parsedDate.getTime().toString()} />
            </div>
          )}
        </div>
      </SinglePanelLayout>
    </div>
  );
}
