import { useState, useCallback } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import CodeEditor from '../../components/ui/CodeEditor';
import Select from '../../components/ui/Select';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
  'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
  'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
  'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
  'explicabo', 'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit',
  'fugit', 'consequuntur', 'magni', 'dolores', 'eos', 'ratione', 'sequi',
  'nesciunt', 'neque', 'porro', 'quisquam', 'dolorem', 'adipisci', 'numquam',
  'tempora', 'magnam', 'quaerat', 'nihil', 'impedit', 'quo', 'minus', 'quod',
  'maxime', 'placeat', 'facere', 'possimus', 'assumenda', 'repellendus',
  'temporibus', 'quibusdam', 'illum', 'corporis', 'suscipit', 'laboriosam',
];

function randomWords(count: number): string {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]!);
  }
  return result.join(' ');
}

function generateSentence(): string {
  const len = 8 + Math.floor(Math.random() * 12);
  const words = randomWords(len);
  return words.charAt(0).toUpperCase() + words.slice(1) + '.';
}

function generateParagraph(): string {
  const sentenceCount = 4 + Math.floor(Math.random() * 5);
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(' ');
}

type Mode = 'paragraphs' | 'sentences' | 'words';

export default function LoremIpsumGenerator() {
  const [mode, setMode] = useState<Mode>('paragraphs');
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let text = '';
    switch (mode) {
      case 'paragraphs': {
        const paragraphs: string[] = [];
        for (let i = 0; i < count; i++) paragraphs.push(generateParagraph());
        text = paragraphs.join('\n\n');
        break;
      }
      case 'sentences': {
        const sentences: string[] = [];
        for (let i = 0; i < count; i++) sentences.push(generateSentence());
        text = sentences.join(' ');
        break;
      }
      case 'words': {
        text = randomWords(count);
        break;
      }
    }
    setOutput(text);
    setCopied(false);
  }, [mode, count]);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lorem_ipsum.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem 1.25rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Type:</label>
          <Select
            options={[
              { label: 'Paragraphs', value: 'paragraphs' },
              { label: 'Sentences', value: 'sentences' },
              { label: 'Words', value: 'words' },
            ]}
            value={mode}
            onChange={(value) => setMode(value as Mode)}
            style={{ width: '140px', height: '2.25rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Count:</label>
          <input
            type="number"
            min={1}
            max={mode === 'words' ? 500 : 50}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(mode === 'words' ? 500 : 50, Number(e.target.value))))}
            className="input"
            style={{ width: '5rem', height: '2.25rem', textAlign: 'center' }}
          />
        </div>

        <button onClick={generate} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <RefreshCw size={16} />
          Generate
        </button>

        {output && (
          <button
            onClick={handleCopy}
            className="btn btn-ghost"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: copied ? 'var(--color-success)' : undefined }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {/* Output */}
      <CodeEditor
        value={output}
        readOnly
        title="Generated Text"
        language="Text"
        placeholder='Click "Generate" to create placeholder text...'
        onDownload={output ? handleDownload : undefined}
        wrap={true}
        minHeight="400px"
      />
    </div>
  );
}
