import { useState } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import { Settings2 } from 'lucide-react';

export default function SlugGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  
  const [lowercase, setLowercase] = useState(true);
  const [separator, setSeparator] = useState('-');
  const [removeStopWords, setRemoveStopWords] = useState(false);

  const stopWords = new Set(['a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with']);

  const generateSlug = (text: string, isLower: boolean, sep: string, removeWords: boolean) => {
    if (!text) return '';
    
    let slug = text;

    // Convert to lowercase if requested
    if (isLower) {
      slug = slug.toLowerCase();
    }

    // Normalize accents and remove diacritics
    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (removeWords) {
      // Basic stop word removal (assumes English)
      slug = slug.split(/\s+/)
                 .filter(word => !stopWords.has(word.toLowerCase()))
                 .join(' ');
    }

    // Replace non-alphanumeric characters with the separator
    // First replace spaces/underscores/hyphens with the separator
    slug = slug.replace(/[\s_.-]+/g, sep);
    
    // Then remove anything that isn't a letter, number, or the separator
    const sepRegex = sep === '-' ? '\\-' : sep;
    const cleanRegex = new RegExp(`[^a-zA-Z0-9${sepRegex}]`, 'g');
    slug = slug.replace(cleanRegex, '');
    
    // Trim separator from ends
    const trimRegex = new RegExp(`^${sepRegex}+|${sepRegex}+$`, 'g');
    slug = slug.replace(trimRegex, '');

    return slug;
  };

  const handleInputChange = (val: string) => {
    setInput(val);
    setOutput(generateSlug(val, lowercase, separator, removeStopWords));
  };

  const handleOptionChange = (option: 'lower' | 'sep' | 'stopWords', val?: string) => {
    const newLower = option === 'lower' ? !lowercase : lowercase;
    const newSep = option === 'sep' ? val || '-' : separator;
    const newStopWords = option === 'stopWords' ? !removeStopWords : removeStopWords;

    if (option === 'lower') setLowercase(newLower);
    if (option === 'sep' && val) setSeparator(val);
    if (option === 'stopWords') setRemoveStopWords(newStopWords);

    setOutput(generateSlug(input, newLower, newSep, newStopWords));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Settings2 size={16} style={{ color: 'var(--color-fg-muted)' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-fg)' }}>Options:</span>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
          <input
            type="checkbox"
            checked={lowercase}
            onChange={() => handleOptionChange('lower')}
            style={{ accentColor: 'var(--color-primary)', width: '1rem', height: '1rem' }}
          />
          Lowercase Result
        </label>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
          <input
            type="checkbox"
            checked={removeStopWords}
            onChange={() => handleOptionChange('stopWords')}
            style={{ accentColor: 'var(--color-primary)', width: '1rem', height: '1rem' }}
          />
          Remove Stop Words (a, the, in, etc.)
        </label>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderLeft: '1px solid var(--color-border)', paddingLeft: '1rem' }}>
          <span style={{ fontSize: '0.875rem' }}>Separator:</span>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button 
              onClick={() => handleOptionChange('sep', '-')}
              style={{
                padding: '0.25rem 0.5rem',
                fontSize: '0.8125rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: separator === '-' ? 'var(--color-primary)' : 'transparent',
                color: separator === '-' ? 'var(--color-primary-fg)' : 'var(--color-fg)',
                border: '1px solid',
                borderColor: separator === '-' ? 'var(--color-primary)' : 'var(--color-border)',
                cursor: 'pointer'
              }}
            >
              Hyphen (-)
            </button>
            <button 
              onClick={() => handleOptionChange('sep', '_')}
              style={{
                padding: '0.25rem 0.5rem',
                fontSize: '0.8125rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: separator === '_' ? 'var(--color-primary)' : 'transparent',
                color: separator === '_' ? 'var(--color-primary-fg)' : 'var(--color-fg)',
                border: '1px solid',
                borderColor: separator === '_' ? 'var(--color-primary)' : 'var(--color-border)',
                cursor: 'pointer'
              }}
            >
              Underscore (_)
            </button>
          </div>
        </div>
      </div>

      <TwoPanelLayout>
        <div style={{ height: '100%', minHeight: '300px' }}>
          <CodeEditor
            value={input}
            onChange={handleInputChange}
            title="Title or Sentence"
            placeholder="e.g. 10 Best Ways to Write React Components in 2024!"
            language="Text"
            wrap={true}
            minHeight="100%"
          />
        </div>

        <div style={{ height: '100%', minHeight: '300px' }}>
          <CodeEditor
            value={output}
            readOnly
            title="Generated URL Slug"
            language="Text"
            wrap={true}
            minHeight="100%"
          />
        </div>
      </TwoPanelLayout>
    </div>
  );
}
