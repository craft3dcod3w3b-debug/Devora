import { useState } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import { Layers } from 'lucide-react';

export default function RemoveDuplicateLines() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimLines, setTrimLines] = useState(true);

  const processText = (text: string, isCaseSensitive: boolean, shouldTrim: boolean) => {
    if (!text) return '';
    const lines = text.split(/\r?\n/);
    const seen = new Set<string>();
    const result: string[] = [];

    for (const rawLine of lines) {
      const line = shouldTrim ? rawLine.trim() : rawLine;
      const compareLine = isCaseSensitive ? line : line.toLowerCase();
      if (!seen.has(compareLine)) {
        seen.add(compareLine);
        result.push(line);
      }
    }

    return result.join('\n');
  };

  const handleInputChange = (val: string) => {
    setInput(val);
    setOutput(processText(val, caseSensitive, trimLines));
  };

  const handleCaseToggle = () => {
    const newCase = !caseSensitive;
    setCaseSensitive(newCase);
    setOutput(processText(input, newCase, trimLines));
  };

  const handleTrimToggle = () => {
    const newTrim = !trimLines;
    setTrimLines(newTrim);
    setOutput(processText(input, caseSensitive, newTrim));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
        <button
          onClick={handleCaseToggle}
          className={`btn ${caseSensitive ? 'btn-primary' : 'btn-ghost'}`}
          style={{
            padding: '0.375rem 0.75rem',
            fontSize: '0.8125rem',
            backgroundColor: caseSensitive ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
            color: caseSensitive ? 'var(--color-primary-fg)' : 'var(--color-fg-secondary)',
            border: `1px solid ${caseSensitive ? 'var(--color-primary)' : 'var(--color-border)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}
        >
          <Layers size={14} />
          Case Sensitive Comparison
        </button>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', marginLeft: '0.5rem' }}>
          <input
            type="checkbox"
            checked={trimLines}
            onChange={handleTrimToggle}
            style={{ accentColor: 'var(--color-primary)', width: '1rem', height: '1rem' }}
          />
          Trim Whitespace (Recommended)
        </label>
      </div>

      <TwoPanelLayout>
        <div style={{ height: '100%', minHeight: '300px' }}>
          <CodeEditor
            value={input}
            onChange={handleInputChange}
            title="Original Text"
            placeholder="Paste text with duplicate lines here..."
            language="Text"
            wrap={false}
            minHeight="100%"
          />
        </div>

        <div style={{ height: '100%', minHeight: '300px' }}>
          <CodeEditor
            value={output}
            readOnly
            title={`Unique Lines (${output ? output.split('\n').length : 0} total)`}
            language="Text"
            wrap={false}
            minHeight="100%"
          />
        </div>
      </TwoPanelLayout>
    </div>
  );
}
