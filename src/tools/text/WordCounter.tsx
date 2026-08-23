import { useState } from 'react';
import { SinglePanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';

export default function WordCounter() {
  const [input, setInput] = useState('');

  const characters = input.length;
  const charactersNoSpaces = input.replace(/\s/g, '').length;
  const words = input.trim() ? input.trim().split(/\s+/).length : 0;
  const sentences = input.trim() ? input.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
  const paragraphs = input.trim() ? input.split(/\n+/).filter(p => p.trim().length > 0).length : 0;

  return (
    <SinglePanelLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
          gap: '1rem' 
        }}>
          <StatBox label="Words" value={words} />
          <StatBox label="Characters" value={characters} />
          <StatBox label="Characters (No Spaces)" value={charactersNoSpaces} />
          <StatBox label="Sentences" value={sentences} />
          <StatBox label="Paragraphs" value={paragraphs} />
        </div>
        
        <CodeEditor
          value={input}
          onChange={setInput}
          placeholder="Paste or type your text here to analyze..."
          language="Text"
          wrap={true}
          minHeight="400px"
        />
      </div>
    </SinglePanelLayout>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ 
      backgroundColor: 'var(--color-bg-secondary)', 
      padding: '1rem', 
      borderRadius: 'var(--radius-md)', 
      border: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.25rem'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-fg)' }}>
        {value.toLocaleString()}
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </div>
    </div>
  );
}
