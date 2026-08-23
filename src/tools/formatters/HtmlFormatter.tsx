import { useState } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import { html_beautify } from 'js-beautify';

export default function HtmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateHtml = (html: string) => {
    const voidElements = new Set([
      'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 
      'link', 'meta', 'param', 'source', 'track', 'wbr'
    ]);
    
    // Remove comments, scripts, and styles before validation to avoid false positives
    const noComments = html.replace(/<!--[\s\S]*?-->/g, '');
    const noScripts = noComments.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    const noStyles = noScripts.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  
    const stack: string[] = [];
    const errors: string[] = [];
    const tagRegex = /<\s*(\/?)\s*([a-zA-Z0-9\-:]+)(?:\s+(?:[^>"']|"[^"]*"|'[^']*')*)*\s*(\/?)\s*>/g;
  
    let match;
    while ((match = tagRegex.exec(noStyles)) !== null) {
      const isClosing = match[1] === '/';
      const tagName = match[2]!.toLowerCase();
      const isSelfClosing = match[3] === '/';
  
      if (isClosing) {
        if (voidElements.has(tagName)) {
          errors.push(`Invalid closing tag for void element: </${tagName}>`);
          continue;
        }
        if (stack.length === 0) {
          errors.push(`Unexpected closing tag: </${tagName}>`);
          continue;
        }
        
        const lastTag = stack[stack.length - 1];
        if (lastTag !== tagName) {
          // Mismatch: see if the expected closing tag exists further down the stack
          const tagIndex = stack.lastIndexOf(tagName);
          if (tagIndex !== -1) {
            // Tags above it are unclosed
            const unclosedTags = stack.splice(tagIndex + 1);
            for (const unclosed of unclosedTags.reverse()) {
              errors.push(`Unclosed tag: <${unclosed}>`);
            }
            // Pop the matching tag
            stack.pop();
          } else {
            errors.push(`Unexpected closing tag: </${tagName}> (currently inside <${lastTag}>)`);
          }
        } else {
          stack.pop();
        }
      } else {
        if (!voidElements.has(tagName) && !isSelfClosing) {
          stack.push(tagName);
        }
      }
    }
  
    while (stack.length > 0) {
      errors.push(`Unclosed tag: <${stack.pop()}>`);
    }

    if (errors.length > 0) {
      const errorWord = errors.length === 1 ? 'error' : 'errors';
      throw new Error(`HTML validation failed — ${errors.length} ${errorWord} found:\n• ${errors.join('\n• ')}`);
    }
  };

  const formatHtml = (text: string) => {
    if (!text.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    
    try {
      validateHtml(text);
      const formatted = html_beautify(text, {
        indent_size: 2,
        preserve_newlines: true,
        max_preserve_newlines: 1,
        end_with_newline: true,
        unformatted: [],
        inline: [],
        content_unformatted: [],
      });
      setOutput(formatted);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid HTML');
      setOutput('');
    }
  };

  const minifyHtml = (text: string) => {
    if (!text.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      validateHtml(text);
      // Basic HTML minification (for more robust, could use a dedicated minifier)
      const minified = text
        .replace(/\s+/g, ' ')
        .replace(/> </g, '><')
        .replace(/<!--[\s\S]*?-->/g, '')
        .trim();
      setOutput(minified);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid HTML');
      setOutput('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
        <button
          onClick={() => formatHtml(input)}
          className="btn btn-primary"
        >
          Format HTML
        </button>
        <button
          onClick={() => minifyHtml(input)}
          className="btn btn-ghost"
        >
          Minify HTML
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
            title="Raw HTML"
            placeholder="Paste your ugly HTML here..."
            language="HTML"
            wrap={false}
            minHeight="100%"
          />
        </div>

        <div style={{ height: '100%', minHeight: '400px' }}>
          <CodeEditor
            value={output}
            readOnly
            title="Formatted Output"
            language="HTML"
            wrap={false}
            minHeight="100%"
          />
        </div>
      </TwoPanelLayout>
    </div>
  );
}
