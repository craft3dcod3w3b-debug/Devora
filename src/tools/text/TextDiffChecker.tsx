import { useState, useMemo } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import { diffWords, diffLines, Change } from 'diff';
import Select from '../../components/ui/Select';

type DiffMode = 'words' | 'lines';

export default function TextDiffChecker() {
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [diffMode, setDiffMode] = useState<DiffMode>('words');

  const diffResult: Change[] = useMemo(() => {
    if (!inputA && !inputB) return [];
    if (diffMode === 'words') {
      return diffWords(inputA, inputB);
    } else {
      return diffLines(inputA, inputB);
    }
  }, [inputA, inputB, diffMode]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Diff Mode:</label>
        <Select
          options={[
            { label: 'Words', value: 'words' },
            { label: 'Lines', value: 'lines' },
          ]}
          value={diffMode}
          onChange={(val) => setDiffMode(val as DiffMode)}
          style={{ width: '120px' }}
        />
      </div>

      <TwoPanelLayout minHeight="auto">
        <div style={{ height: '240px' }}>
          <CodeEditor
            value={inputA}
            onChange={setInputA}
            title="Original Text"
            placeholder="Paste original text here..."
            language="Text"
            wrap={true}
            minHeight="100%"
          />
        </div>

        <div style={{ height: '240px' }}>
          <CodeEditor
            value={inputB}
            onChange={setInputB}
            title="Changed Text"
            placeholder="Paste changed text here..."
            language="Text"
            wrap={true}
            minHeight="100%"
          />
        </div>
      </TwoPanelLayout>

      {(inputA || inputB) && (
        <div style={{ 
          backgroundColor: 'var(--color-code-bg)', 
          border: '1px solid var(--color-border)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '1.25rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          color: 'var(--color-code-fg)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          <div style={{ marginBottom: '1rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-fg)' }}>
            Diff Result
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            {diffResult.map((part, index) => {
              let backgroundColor = 'transparent';
              let color = 'inherit';
              
              if (part.added) {
                backgroundColor = 'rgba(16, 185, 129, 0.15)'; // Success/Green
                color = 'var(--color-success)';
              } else if (part.removed) {
                backgroundColor = 'rgba(239, 68, 68, 0.15)'; // Error/Red
                color = 'var(--color-error)';
                // Strikethrough for removed words in word mode, maybe not lines to keep readable
              }
              
              return (
                <span 
                  key={index} 
                  style={{ 
                    backgroundColor, 
                    color,
                    padding: part.added || part.removed ? '0.125rem 0' : '0',
                    textDecoration: part.removed && diffMode === 'words' ? 'line-through' : 'none'
                  }}
                >
                  {part.value}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
