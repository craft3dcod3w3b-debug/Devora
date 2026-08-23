import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import Select from '../../components/ui/Select';
import { Settings2 } from 'lucide-react';

type PresetType = 'Users' | 'Products' | 'Posts' | 'Custom';

const PRESET_SCHEMAS: Record<PresetType, Record<string, string>> = {
  Users: {
    id: 'uuid',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    isActive: 'boolean',
    createdAt: 'pastDate',
  },
  Products: {
    id: 'uuid',
    name: 'productName',
    price: 'number:10:1000',
    inStock: 'boolean',
    category: 'word',
  },
  Posts: {
    id: 'uuid',
    title: 'sentence',
    body: 'paragraph',
    authorId: 'uuid',
    publishedAt: 'pastDate',
  },
  Custom: {},
};

// Extremely lightweight mock data generator
const generateMockValue = (type: string): any => {
  if (type.startsWith('number:')) {
    const parts = type.split(':').map(Number);
    const min = parts[1] ?? 0;
    const max = parts[2] ?? 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  switch (type) {
    case 'uuid':
      return crypto.randomUUID();
    case 'firstName':
      return ['John', 'Jane', 'Alex', 'Emily', 'Chris', 'Katie', 'Mike', 'Sarah'][Math.floor(Math.random() * 8)];
    case 'lastName':
      return ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'][Math.floor(Math.random() * 7)];
    case 'email':
      return `${Math.random().toString(36).substring(7)}@example.com`;
    case 'boolean':
      return Math.random() > 0.5;
    case 'pastDate':
      return new Date(Date.now() - Math.random() * 10000000000).toISOString();
    case 'productName':
      return ['Laptop', 'Smartphone', 'Headphones', 'Monitor', 'Keyboard', 'Mouse'][Math.floor(Math.random() * 6)];
    case 'word':
      return ['electronics', 'clothing', 'books', 'home', 'toys'][Math.floor(Math.random() * 5)];
    case 'sentence':
      return 'The quick brown fox jumps over the lazy dog.';
    case 'paragraph':
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    default:
      return 'unknown';
  }
};

export default function MockDataGenerator() {
  const [preset, setPreset] = useState<PresetType>('Users');
  const [schemaStr, setSchemaStr] = useState(JSON.stringify(PRESET_SCHEMAS['Users'], null, 2));
  const [count, setCount] = useState<number | string>(5);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const parsedSchema = JSON.parse(schemaStr);
      const data = [];
      const actualCount = Number(count) || 0;
      for (let i = 0; i < actualCount; i++) {
        const item: any = {};
        for (const [key, valType] of Object.entries(parsedSchema)) {
          item[key] = generateMockValue(String(valType));
        }
        data.push(item);
      }
      setOutput(JSON.stringify(data, null, 2));
      setError('');
    } catch (err) {
      setError('Invalid JSON schema format.');
    }
  }, [schemaStr, count]);

  const handlePresetChange = (p: PresetType) => {
    setPreset(p);
    if (p !== 'Custom') {
      setSchemaStr(JSON.stringify(PRESET_SCHEMAS[p], null, 2));
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mock-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
          <Settings2 size={18} />
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Preset:</span>
        </div>
        <Select
          value={preset}
          onChange={(val) => handlePresetChange(val as PresetType)}
          options={Object.keys(PRESET_SCHEMAS).map((p) => ({ label: p, value: p }))}
          style={{ width: '130px', height: '2.25rem' }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto', color: 'var(--color-fg-secondary)' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Count:</span>
        </div>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(e.target.value === '' ? '' : Number(e.target.value))}
          className="input"
          style={{ width: '80px', padding: '0.25rem 0.75rem', height: '2rem' }}
        />
      </div>

      <TwoPanelLayout>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-fg-muted)' }}>
            Available types: uuid, firstName, lastName, email, boolean, pastDate, productName, word, sentence, paragraph, number:min:max
          </div>
          <CodeEditor
            value={schemaStr}
            onChange={(val) => {
              setSchemaStr(val);
              setPreset('Custom');
            }}
            title="Schema Definition (JSON)"
            language="JSON"
            placeholder="Define your JSON schema..."
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
          <CodeEditor
            value={error ? '' : output}
            readOnly
            title={`Generated Data (${Number(count) || 0} items)`}
            language="JSON"
            placeholder={error ? 'Fix errors to see output' : 'Mock data will appear here...'}
            onDownload={output && !error ? handleDownload : undefined}
          />
          {error && (
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--color-error-light)',
                color: 'var(--color-error)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                border: '1px solid var(--color-error)',
              }}
            >
              {error}
            </div>
          )}
        </div>
      </TwoPanelLayout>
    </div>
  );
}
