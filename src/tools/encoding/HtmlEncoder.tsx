import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';

export default function HtmlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }

    const encoded = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    setOutput(encoded);
  }, [input]);

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'html_encoded.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <TwoPanelLayout>
      <CodeEditor
        value={input}
        onChange={setInput}
        title="Plain Text or HTML Input"
        language="Text/HTML"
        placeholder="Type or paste text to HTML encode..."
        onFileUpload={setInput}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        <CodeEditor
          value={output}
          readOnly
          title="HTML Encoded Output"
          language="HTML Entities"
          placeholder="HTML encoded string will appear here..."
          onDownload={output ? handleDownload : undefined}
        />
      </div>
    </TwoPanelLayout>
  );
}
