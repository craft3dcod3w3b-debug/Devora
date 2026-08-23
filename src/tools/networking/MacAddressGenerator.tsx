import { useState } from 'react';
import CodeEditor from '../../components/ui/CodeEditor';
import Select from '../../components/ui/Select';
import { Copy, RefreshCw } from 'lucide-react';

type MacFormat = 'colon' | 'hyphen' | 'dot' | 'none';

export default function MacAddressGenerator() {
  const [format, setFormat] = useState<MacFormat>('colon');
  const [uppercase, setUppercase] = useState(true);
  const [count, setCount] = useState(10);
  const [output, setOutput] = useState(generateMacs(10, 'colon', true));

  function generateMacs(amount: number, fmt: MacFormat, upper: boolean) {
    const macs = [];
    for (let i = 0; i < amount; i++) {
      const bytes = Array.from({ length: 6 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0'));
      let macStr = '';
      if (fmt === 'colon') macStr = bytes.join(':');
      else if (fmt === 'hyphen') macStr = bytes.join('-');
      else if (fmt === 'dot') macStr = `${bytes[0]}${bytes[1]}.${bytes[2]}${bytes[3]}.${bytes[4]}${bytes[5]}`;
      else macStr = bytes.join('');
      
      macs.push(upper ? macStr.toUpperCase() : macStr.toLowerCase());
    }
    return macs.join('\n');
  }

  const handleGenerate = () => {
    setOutput(generateMacs(count, format, uppercase));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
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
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Format:</span>
        </div>
        <Select
          value={format}
          onChange={(val) => setFormat(val as MacFormat)}
          options={[
            { label: 'Colon (00:1A:2B...)', value: 'colon' },
            { label: 'Hyphen (00-1A-2B...)', value: 'hyphen' },
            { label: 'Dot (001A.2B...)', value: 'dot' },
            { label: 'None (001A2B...)', value: 'none' },
          ]}
          style={{ width: '220px', height: '2.25rem' }}
        />

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem', color: 'var(--color-fg-secondary)', fontSize: '0.875rem' }}>
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            style={{ accentColor: 'var(--color-primary)' }}
          />
          Uppercase
        </label>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto', color: 'var(--color-fg-secondary)' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Count:</span>
        </div>
        <input
          type="number"
          min={1}
          max={1000}
          value={count}
          onChange={(e) => setCount(Number(e.target.value) || 1)}
          className="input"
          style={{ width: '80px', padding: '0.25rem 0.75rem', height: '2rem' }}
        />
        
        <button
          onClick={handleGenerate}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', height: '2rem', fontSize: '0.875rem' }}
        >
          <RefreshCw size={16} />
          Generate
        </button>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <CodeEditor
          value={output}
          readOnly
          title="Generated MAC Addresses"
          language="Text"
          placeholder="Generated MAC addresses will appear here..."
        />
        <button
          onClick={handleCopy}
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '1rem',
            padding: '0.5rem',
            background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            color: 'var(--color-fg-secondary)',
          }}
          title="Copy to clipboard"
        >
          <Copy size={16} />
        </button>
      </div>
    </div>
  );
}
