import { useState } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import { css_beautify } from 'js-beautify';
import { parse } from 'css-tree';

export default function CssFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const translateCssError = (msg: string): { problem: string; fix: string } => {
    const lower = msg.toLowerCase();
    
    if (lower.includes('unexpected input') || lower.includes('unexpected character')) {
      return {
        problem: 'Unexpected character or token found.',
        fix: 'Check for missing semicolons (;) on the previous line or invalid syntax in this area.'
      };
    }
    if (lower.includes('colon is expected') || lower.includes('expected colon')) {
      return {
        problem: 'Missing colon (:) in CSS declaration.',
        fix: 'Ensure properties are formatted correctly, e.g., "property: value;".'
      };
    }
    if (lower.includes('unclosed') && lower.includes('string')) {
      return {
        problem: 'Unclosed string literal.',
        fix: 'Add a closing quote (\' or ") to complete the string.'
      };
    }
    if (lower.includes('unclosed') && lower.includes('comment')) {
      return {
        problem: 'Unclosed CSS comment.',
        fix: 'Add "*/" to properly close the comment block.'
      };
    }
    if (lower.includes('identifier is expected')) {
      return {
        problem: 'Missing or invalid identifier.',
        fix: 'Ensure you have provided a valid CSS property name, selector, or class.'
      };
    }
    if (lower.includes('is expected')) {
      const match = msg.match(/(?:'|")([^'"]+)(?:'|")/);
      const token = match ? match[1] : 'token';
      return {
        problem: `Missing expected token: ${token}`,
        fix: `Add the missing "${token}" to complete the CSS structure.`
      };
    }
    if (lower.includes('unknown') && lower.includes('at-rule')) {
      return {
        problem: 'Invalid or unknown @rule.',
        fix: 'Check the spelling of your @rule (e.g., @media, @keyframes).'
      };
    }
  
    // Fallback for any other future/unknown error
    return {
      problem: `Invalid CSS syntax (${msg}).`,
      fix: 'Review the CSS structure near this location for typos or malformed rules.'
    };
  };

  const validateCss = (text: string) => {
    const errors: string[] = [];

    // 1. Custom Tokenizer (Catches EOF unclosed comments, strings, and braces)
    let inString = false;
    let stringChar = '';
    let inComment = false;
    
    const stack: string[] = [];
    let currentBuffer = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1] || '';
      const prevChar = text[i - 1] || '';

      if (inComment) {
        if (char === '*' && nextChar === '/') {
          inComment = false;
          i++; // skip next char
        }
        continue;
      }

      if (!inString && char === '/' && nextChar === '*') {
        inComment = true;
        i++;
        continue;
      }

      if (inString) {
        if (char === stringChar && prevChar !== '\\') {
          inString = false;
        } else if (char === '\n' && prevChar !== '\\') {
          errors.push('Unclosed string literal before line break.');
          inString = false; // Reset to avoid breaking rest of parser
        }
        continue;
      }

      if (char === '"' || char === "'") {
        inString = true;
        stringChar = char;
        continue;
      }

      if (char === '{') {
        const selector = currentBuffer.split(';').pop()?.split('}').pop()?.trim() || 'block';
        stack.push(selector);
        currentBuffer = '';
      } else if (char === '}') {
        if (stack.length === 0) {
          errors.push(`Unexpected extra "}" found.`);
        } else {
          stack.pop();
        }
        currentBuffer = '';
      } else {
        currentBuffer += char;
      }
    }

    if (inComment) {
      errors.push('Unclosed CSS comment. Add "*/" to properly close the comment block.');
    }
    if (inString) {
      errors.push(`Unclosed string literal (${stringChar}). Add a closing quote to complete the string.`);
    }
    while (stack.length > 0) {
      const unclosed = stack.pop();
      errors.push(`Missing closing "}" for rule block near "${unclosed}".`);
    }

    // 2. Strict CSS Tree Parsing
    try {
      parse(text, { 
        positions: true, 
        parseCustomProperty: true,
        onParseError: (err: any) => {
          const { problem, fix } = translateCssError(err.message);
          const trace = typeof err.sourceFragment === 'function' ? err.sourceFragment() : '';
          errors.push(`Line ${err.line}, Column ${err.column}: ${problem}\nFix: ${fix}\n\n${trace}`);
        }
      });
    } catch (err: any) {
      if (err.name === 'CssSyntaxError') {
        const { problem, fix } = translateCssError(err.message);
        const trace = typeof err.sourceFragment === 'function' ? err.sourceFragment() : '';
        errors.push(`Line ${err.line}, Column ${err.column}: ${problem}\nFix: ${fix}\n\n${trace}`);
      } else {
        throw err;
      }
    }

    if (errors.length > 0) {
      const errorWord = errors.length === 1 ? 'error' : 'errors';
      throw new Error(`CSS Validation Failed — ${errors.length} ${errorWord} found:\n\n• ${errors.join('\n\n• ')}`);
    }
  };

  const formatCss = (text: string) => {
    if (!text.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    
    try {
      validateCss(text);
      const formatted = css_beautify(text, {
        indent_size: 2,
        end_with_newline: true,
      });
      setOutput(formatted);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid CSS');
      setOutput('');
    }
  };

  const minifyCss = (text: string) => {
    if (!text.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      validateCss(text);
      // Basic CSS minification (removes whitespace and comments)
      const minified = text
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ')             // Replace multiple spaces with one
        .replace(/\s*([{}\[\]:;,])\s*/g, '$1') // Remove spaces around delimiters
        .replace(/;}/g, '}')              // Remove trailing semicolons inside blocks
        .trim();
      setOutput(minified);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid CSS');
      setOutput('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
        <button
          onClick={() => formatCss(input)}
          className="btn btn-primary"
        >
          Format CSS
        </button>
        <button
          onClick={() => minifyCss(input)}
          className="btn btn-ghost"
        >
          Minify CSS
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
            title="Raw CSS"
            placeholder="Paste your unformatted CSS here..."
            language="CSS"
            wrap={false}
            minHeight="100%"
          />
        </div>

        <div style={{ height: '100%', minHeight: '400px' }}>
          <CodeEditor
            value={output}
            readOnly
            title="Formatted Output"
            language="CSS"
            wrap={false}
            minHeight="100%"
          />
        </div>
      </TwoPanelLayout>
    </div>
  );
}
