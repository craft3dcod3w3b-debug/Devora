import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import YAML from 'yaml';
import { ArrowRightLeft } from 'lucide-react';

export default function YamlToJson() {
  const [input, setInput] = useState('name: John Doe\nage: 30\nroles:\n  - admin\n  - user');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'yaml2json' | 'json2yaml'>('yaml2json');

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      if (mode === 'yaml2json') {
        const parsed = YAML.parse(input);
        if (typeof parsed !== 'object' || parsed === null) {
          throw new Error('Input must be a valid YAML object or array.');
        }
        setOutput(JSON.stringify(parsed, null, 2));
      } else {
        const parsed = JSON.parse(input);
        setOutput(YAML.stringify(parsed));
      }
      setError('');
    } catch (err) {
      setOutput('');
      if (err instanceof Error) {
        setError(`Conversion Error: ${err.message}`);
      } else {
        setError('Conversion Error.');
      }
    }
  }, [input, mode]);

  const toggleMode = () => {
    setMode(mode === 'yaml2json' ? 'json2yaml' : 'yaml2json');
    setInput(output);
  };

  const handleDownload = () => {
    const ext = mode === 'yaml2json' ? 'json' : 'yaml';
    const mime = mode === 'yaml2json' ? 'application/json' : 'text/yaml';
    const blob = new Blob([output], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
        }}
      >
        <button
          onClick={toggleMode}
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1.5rem', fontWeight: 600 }}
        >
          {mode === 'yaml2json' ? 'YAML' : 'JSON'}
          <ArrowRightLeft size={18} />
          {mode === 'yaml2json' ? 'JSON' : 'YAML'}
        </button>
      </div>

      <TwoPanelLayout>
        <CodeEditor
          value={input}
          onChange={setInput}
          title={mode === 'yaml2json' ? 'YAML Input' : 'JSON Input'}
          language={mode === 'yaml2json' ? 'YAML' : 'JSON'}
          placeholder={`Paste ${mode === 'yaml2json' ? 'YAML' : 'JSON'} data here...`}
          onFileUpload={setInput}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
          <CodeEditor
            value={error ? '' : output}
            readOnly
            title={mode === 'yaml2json' ? 'JSON Output' : 'YAML Output'}
            language={mode === 'yaml2json' ? 'JSON' : 'YAML'}
            placeholder={error ? 'Fix errors to see output' : `${mode === 'yaml2json' ? 'JSON' : 'YAML'} will appear here...`}
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
                fontFamily: 'var(--font-mono)',
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
