import { useState } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';

type CaseType = 'uppercase' | 'lowercase' | 'title' | 'sentence' | 'camel' | 'snake' | 'kebab';

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeCase, setActiveCase] = useState<CaseType>('uppercase');

  const convertCase = (text: string, type: CaseType) => {
    if (!text) return '';
    
    switch (type) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lowercase':
        return text.toLowerCase();
      case 'title':
        return text.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      case 'sentence':
        return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
      case 'camel':
        return text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
          })
          .replace(/\s+/g, '');
      case 'snake':
        return text
          .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          ?.map(x => x.toLowerCase())
          .join('_') || text;
      case 'kebab':
        return text
          .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          ?.map(x => x.toLowerCase())
          .join('-') || text;
      default:
        return text;
    }
  };

  const handleConvert = (type: CaseType) => {
    setActiveCase(type);
    setOutput(convertCase(input, type));
  };

  // Convert on the fly if input changes
  const handleInputChange = (val: string) => {
    setInput(val);
    setOutput(convertCase(val, activeCase));
  };

  return (
    <TwoPanelLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <CaseButton label="UPPERCASE" type="uppercase" active={activeCase} onClick={handleConvert} />
          <CaseButton label="lowercase" type="lowercase" active={activeCase} onClick={handleConvert} />
          <CaseButton label="Title Case" type="title" active={activeCase} onClick={handleConvert} />
          <CaseButton label="Sentence case" type="sentence" active={activeCase} onClick={handleConvert} />
          <CaseButton label="camelCase" type="camel" active={activeCase} onClick={handleConvert} />
          <CaseButton label="snake_case" type="snake" active={activeCase} onClick={handleConvert} />
          <CaseButton label="kebab-case" type="kebab" active={activeCase} onClick={handleConvert} />
        </div>
        
        <div style={{ flex: 1, minHeight: '300px' }}>
          <CodeEditor
            value={input}
            onChange={handleInputChange}
            placeholder="Type or paste your text here..."
            title="Input Text"
            language="Text"
            wrap={true}
            minHeight="100%"
          />
        </div>
      </div>

      <div style={{ height: '100%', minHeight: '300px' }}>
        <CodeEditor
          value={output}
          readOnly
          title="Converted Text"
          language="Text"
          wrap={true}
          minHeight="100%"
        />
      </div>
    </TwoPanelLayout>
  );
}

function CaseButton({ label, type, active, onClick }: { label: string; type: CaseType; active: CaseType; onClick: (t: CaseType) => void }) {
  const isActive = active === type;
  return (
    <button
      onClick={() => onClick(type)}
      className={`btn ${isActive ? 'btn-primary' : 'btn-ghost'}`}
      style={{
        padding: '0.375rem 0.75rem',
        fontSize: '0.8125rem',
        backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
        color: isActive ? 'var(--color-primary-fg)' : 'var(--color-fg-secondary)',
        border: `1px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
      }}
    >
      {label}
    </button>
  );
}
