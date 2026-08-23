import { useState } from 'react';
import { Copy, Check, CheckCircle2, XCircle } from 'lucide-react';

const REGEX_PATTERNS = [
  {
    id: 'email',
    title: 'Email Address',
    description: 'Matches standard email addresses (RFC 5322 approximation).',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    exampleValid: 'test@example.com',
    exampleInvalid: 'test@.com',
  },
  {
    id: 'url',
    title: 'URL (HTTP/HTTPS)',
    description: 'Matches standard web URLs including subdomains and paths.',
    pattern: '^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$',
    exampleValid: 'https://developer.example.com/api',
    exampleInvalid: 'htt://example',
  },
  {
    id: 'ipv4',
    title: 'IPv4 Address',
    description: 'Matches valid IPv4 addresses from 0.0.0.0 to 255.255.255.255.',
    pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    exampleValid: '192.168.1.1',
    exampleInvalid: '256.0.0.1',
  },
  {
    id: 'ipv6',
    title: 'IPv6 Address',
    description: 'Matches standard IPv6 addresses.',
    pattern: '^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$',
    exampleValid: '2001:0DB8:0000:0000:0000:0000:1428:57ab',
    exampleInvalid: '1200::AB00:1234::2552:7777:1313',
  },
  {
    id: 'uuid',
    title: 'UUID (v4)',
    description: 'Matches standard UUID v4 strings.',
    pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$',
    exampleValid: '123e4567-e89b-42d3-a456-426614174000',
    exampleInvalid: '123e4567-e89b-52d3-a456-426614174000',
  },
  {
    id: 'hex-color',
    title: 'Hex Color Code',
    description: 'Matches 3 or 6 digit hex color codes with optional # symbol.',
    pattern: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$',
    exampleValid: '#ff0033',
    exampleInvalid: '#ff003',
  },
  {
    id: 'password',
    title: 'Strong Password',
    description: 'Minimum 8 characters, at least one uppercase, one lowercase, one number and one special character.',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    exampleValid: 'MyP@ssw0rd123',
    exampleInvalid: 'password123',
  },
  {
    id: 'date-iso',
    title: 'Date (YYYY-MM-DD)',
    description: 'Matches ISO-8601 date format.',
    pattern: '^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$',
    exampleValid: '2024-12-31',
    exampleInvalid: '2024-13-32',
  },
  {
    id: 'time-24h',
    title: 'Time (24-hour)',
    description: 'Matches 24-hour time format (HH:MM).',
    pattern: '^(?:[01]\\d|2[0-3]):[0-5]\\d$',
    exampleValid: '23:59',
    exampleInvalid: '24:00',
  },
  {
    id: 'mac-address',
    title: 'MAC Address',
    description: 'Matches MAC addresses with colon or hyphen separators.',
    pattern: '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$',
    exampleValid: '00:1B:44:11:3A:B7',
    exampleInvalid: '00:1B:44:11:3A:B7:88',
  },
];

const PatternCard = ({ item }: { item: typeof REGEX_PATTERNS[0] }) => {
  const [copied, setCopied] = useState(false);
  const [testInput, setTestInput] = useState(item.exampleValid);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.pattern);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
  };

  const isMatch = () => {
    if (!testInput) return null;
    try {
      const re = new RegExp(item.pattern);
      return re.test(testInput);
    } catch (e) {
      return false;
    }
  };

  const matchResult = isMatch();

  return (
    <div style={{ backgroundColor: 'var(--color-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-foreground)' }}>{item.title}</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)', lineHeight: 1.5 }}>{item.description}</p>
      </div>

      {/* Code Block */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <code style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: 'var(--color-primary)', wordBreak: 'break-all' }}>
          {item.pattern}
        </code>
        <button
          onClick={handleCopy}
          className="button button-ghost"
          style={{ padding: '0.5rem', flexShrink: 0 }}
          title="Copy pattern"
        >
          {copied ? <Check size={18} style={{ color: 'var(--color-success)' }} /> : <Copy size={18} />}
        </button>
      </div>

      {/* Mini Tester */}
      <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted-foreground)', textTransform: 'uppercase' }}>Quick Test</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            className="input"
            style={{ width: '100%', paddingRight: '2.5rem', borderColor: matchResult === true ? 'var(--color-success)' : matchResult === false ? 'var(--color-error)' : 'var(--color-border)' }}
            placeholder={`e.g. ${item.exampleValid}`}
          />
          <div style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            {matchResult === true ? (
              <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} />
            ) : matchResult === false ? (
              <XCircle size={18} style={{ color: 'var(--color-error)' }} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RegexGenerator() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
      {REGEX_PATTERNS.map((pattern) => (
        <PatternCard key={pattern.id} item={pattern} />
      ))}
    </div>
  );
}
