import { useState } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';

export default function WhitespaceCleaner() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const [trimLines, setTrimLines] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true);
  const [replaceMultipleSpaces, setReplaceMultipleSpaces] = useState(true);

  const cleanText = (text: string, trim: boolean, noEmpty: boolean, singleSpace: boolean) => {
    if (!text) return '';
    let result = text;

    if (singleSpace) {
      // Replace multiple spaces with a single space (excluding newlines)
      result = result.replace(/[ \t]+/g, ' ');
    }

    if (trim) {
      // Trim spaces from beginning and end of each line
      result = result.split('\n').map(line => line.trim()).join('\n');
    }

    if (noEmpty) {
      // Remove empty lines
      result = result.split('\n').filter(line => line.length > 0).join('\n');
    }

    return result;
  };

  const handleInputChange = (val: string) => {
    setInput(val);
    setOutput(cleanText(val, trimLines, removeEmptyLines, replaceMultipleSpaces));
  };

  const handleOptionChange = (option: 'trim' | 'empty' | 'spaces') => {
    const newTrim = option === 'trim' ? !trimLines : trimLines;
    const newEmpty = option === 'empty' ? !removeEmptyLines : removeEmptyLines;
    const newSpaces = option === 'spaces' ? !replaceMultipleSpaces : replaceMultipleSpaces;

    if (option === 'trim') setTrimLines(newTrim);
    if (option === 'empty') setRemoveEmptyLines(newEmpty);
    if (option === 'spaces') setReplaceMultipleSpaces(newSpaces);

    setOutput(cleanText(input, newTrim, newEmpty, newSpaces));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
          <input
            type="checkbox"
            checked={trimLines}
            onChange={() => handleOptionChange('trim')}
            style={{ accentColor: 'var(--color-primary)', width: '1rem', height: '1rem' }}
          />
          Trim Lines (Start/End)
        </label>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
          <input
            type="checkbox"
            checked={removeEmptyLines}
            onChange={() => handleOptionChange('empty')}
            style={{ accentColor: 'var(--color-primary)', width: '1rem', height: '1rem' }}
          />
          Remove Empty Lines
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
          <input
            type="checkbox"
            checked={replaceMultipleSpaces}
            onChange={() => handleOptionChange('spaces')}
            style={{ accentColor: 'var(--color-primary)', width: '1rem', height: '1rem' }}
          />
          Replace Multiple Spaces with Single Space
        </label>
      </div>

      <TwoPanelLayout>
        <div style={{ height: '100%', minHeight: '300px' }}>
          <CodeEditor
            value={input}
            onChange={handleInputChange}
            title="Original Text"
            placeholder="Paste text with excessive whitespace here..."
            language="Text"
            wrap={true}
            minHeight="100%"
          />
        </div>

        <div style={{ height: '100%', minHeight: '300px' }}>
          <CodeEditor
            value={output}
            readOnly
            title={`Cleaned Text`}
            language="Text"
            wrap={true}
            minHeight="100%"
          />
        </div>
      </TwoPanelLayout>
    </div>
  );
}
