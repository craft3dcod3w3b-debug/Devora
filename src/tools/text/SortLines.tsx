import { useState } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import Select from '../../components/ui/Select';

type SortOrder = 'alphabetical' | 'alphabetical-reverse' | 'length-asc' | 'length-desc';

export default function SortLines() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('alphabetical');
  const [caseSensitive, setCaseSensitive] = useState(false);

  const processText = (text: string, order: SortOrder, isCaseSensitive: boolean) => {
    if (!text) return '';
    const lines = text.split('\n');

    lines.sort((a, b) => {
      if (order === 'length-asc') {
        return a.length - b.length || a.localeCompare(b);
      }
      if (order === 'length-desc') {
        return b.length - a.length || a.localeCompare(b);
      }
      
      // Alphabetical
      const compA = isCaseSensitive ? a : a.toLowerCase();
      const compB = isCaseSensitive ? b : b.toLowerCase();
      
      if (compA < compB) return order === 'alphabetical' ? -1 : 1;
      if (compA > compB) return order === 'alphabetical' ? 1 : -1;
      return 0;
    });

    return lines.join('\n');
  };

  const handleInputChange = (val: string) => {
    setInput(val);
    setOutput(processText(val, sortOrder, caseSensitive));
  };

  const handleSortChange = (newOrder: string) => {
    const order = newOrder as SortOrder;
    setSortOrder(order);
    setOutput(processText(input, order, caseSensitive));
  };

  const handleCaseToggle = () => {
    const newCase = !caseSensitive;
    setCaseSensitive(newCase);
    setOutput(processText(input, sortOrder, newCase));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Sort By:</label>
          <Select
            options={[
              { label: 'Alphabetical (A-Z)', value: 'alphabetical' },
              { label: 'Alphabetical (Z-A)', value: 'alphabetical-reverse' },
              { label: 'Length (Shortest First)', value: 'length-asc' },
              { label: 'Length (Longest First)', value: 'length-desc' },
            ]}
            value={sortOrder}
            onChange={handleSortChange}
            style={{ width: '220px' }}
          />
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={handleCaseToggle}
            style={{ accentColor: 'var(--color-primary)', width: '1rem', height: '1rem' }}
          />
          Case Sensitive Sort
        </label>
      </div>

      <TwoPanelLayout>
        <div style={{ height: '100%', minHeight: '300px' }}>
          <CodeEditor
            value={input}
            onChange={handleInputChange}
            title="Original Text"
            placeholder="Paste text with lines to sort here..."
            language="Text"
            wrap={false}
            minHeight="100%"
          />
        </div>

        <div style={{ height: '100%', minHeight: '300px' }}>
          <CodeEditor
            value={output}
            readOnly
            title={`Sorted Lines`}
            language="Text"
            wrap={false}
            minHeight="100%"
          />
        </div>
      </TwoPanelLayout>
    </div>
  );
}
