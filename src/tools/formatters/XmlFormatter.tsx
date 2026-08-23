import { useState } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import formatXml from 'xml-formatter';

export default function XmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateXml = (xml: string) => {
    if (typeof window !== 'undefined' && window.DOMParser) {
      const parser = new DOMParser();
      // 'application/xml' enforces strict XML rules (unlike 'text/html')
      const xmlDoc = parser.parseFromString(xml, 'application/xml');
      const parseErrors = xmlDoc.getElementsByTagName('parsererror');
      
      if (parseErrors.length > 0) {
        // The parsererror element usually contains a div with the error text
        const errorText = parseErrors[0]!.textContent || 'Malformed XML';
        throw new Error(errorText);
      }
    }
  };

  const handleXmlError = (err: unknown) => {
    setOutput('');
    const errMsg = err instanceof Error ? err.message : String(err);
    setError(`Unable to format XML\n\n[Parser Error]\n${errMsg}`);
  };

  const performFormatXml = (text: string) => {
    if (!text.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    
    try {
      validateXml(text);
      const formatted = formatXml(text, {
        indentation: '  ',
        collapseContent: true,
        lineSeparator: '\n',
      });
      setOutput(formatted);
      setError(null);
    } catch (err) {
      handleXmlError(err);
    }
  };

  const minifyXml = (text: string) => {
    if (!text.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      validateXml(text);
      // Basic XML minification
      const minified = text
        .replace(/>\s+</g, '><')
        .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
        .trim();
      setOutput(minified);
      setError(null);
    } catch (err) {
      handleXmlError(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
        <button
          onClick={() => performFormatXml(input)}
          className="btn btn-primary"
        >
          Format XML
        </button>
        <button
          onClick={() => minifyXml(input)}
          className="btn btn-ghost"
        >
          Minify XML
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
            title="Raw XML"
            placeholder="Paste your unformatted XML here..."
            language="XML"
            wrap={false}
            minHeight="100%"
          />
        </div>

        <div style={{ height: '100%', minHeight: '400px' }}>
          <CodeEditor
            value={output}
            readOnly
            title="Formatted Output"
            language="XML"
            wrap={false}
            minHeight="100%"
          />
        </div>
      </TwoPanelLayout>
    </div>
  );
}
