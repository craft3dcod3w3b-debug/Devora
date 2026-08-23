import { useState } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import * as prettier from 'prettier/standalone';
import babelPlugin from 'prettier/plugins/babel';
import estreePlugin from 'prettier/plugins/estree';

export default function JavaScriptFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isFormatting, setIsFormatting] = useState(false);

  const formatJs = async (text: string) => {
    if (!text.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    
    setIsFormatting(true);
    try {
      // Prettier inherently handles JS and JSX safely and throws clear errors on invalid syntax
      const formatted = await prettier.format(text, {
        parser: 'babel',
        plugins: [babelPlugin, estreePlugin],
        printWidth: 80,
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        trailingComma: 'es5',
      });
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setOutput('');
      // Prettier provides excellent, human-readable syntax errors with code frames
      setError(err.message || 'Invalid JavaScript / JSX Syntax');
    } finally {
      setIsFormatting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
        <button
          onClick={() => formatJs(input)}
          disabled={isFormatting}
          className="btn btn-primary"
        >
          {isFormatting ? 'Formatting...' : 'Format JS / JSX'}
        </button>
        {error && (
          <div style={{ color: 'var(--color-error)', fontSize: '0.875rem', whiteSpace: 'pre-wrap', width: '100%' }}>
            {error}
          </div>
        )}
      </div>

      <TwoPanelLayout>
        <div style={{ height: '100%', minHeight: '400px' }}>
          <CodeEditor
            value={input}
            onChange={setInput}
            title="Raw JS / JSX"
            placeholder="Paste your unformatted JavaScript or React JSX here..."
            language="JavaScript"
            wrap={false}
            minHeight="100%"
          />
        </div>

        <div style={{ height: '100%', minHeight: '400px' }}>
          <CodeEditor
            value={output}
            readOnly
            title="Formatted Output"
            language="JavaScript"
            wrap={false}
            minHeight="100%"
          />
        </div>
      </TwoPanelLayout>
    </div>
  );
}
