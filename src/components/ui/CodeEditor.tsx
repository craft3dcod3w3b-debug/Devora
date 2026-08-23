import { useState } from 'react';
import { Copy, Download, Trash2, Check, Upload } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  language?: string;
  placeholder?: string;
  title?: string;
  onDownload?: () => void;
  onFileUpload?: (content: string) => void;
  actions?: React.ReactNode;
  wrap?: boolean;
  minHeight?: string;
}

export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
  language,
  placeholder = 'Enter code here...',
  title,
  onDownload,
  onFileUpload,
  actions,
  wrap = false,
  minHeight = '300px',
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleClear = () => {
    if (onChange) onChange('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onFileUpload) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onFileUpload(content);
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight,
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Header / Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0.75rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderBottom: '1px solid var(--color-border)',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {title && (
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-fg)' }}>
              {title}
            </span>
          )}
          {language && (
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-fg-muted)',
                backgroundColor: 'var(--color-bg-tertiary)',
                padding: '0.125rem 0.375rem',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {language}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {actions}
          
          {onFileUpload && !readOnly && (
            <label
              className="btn btn-ghost btn-sm"
              style={{ cursor: 'pointer', padding: '0.375rem', color: 'var(--color-fg-secondary)' }}
              title="Upload File"
            >
              <Upload size={16} />
              <input
                type="file"
                accept=".json,.txt,.csv"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
          )}

          {!readOnly && (
            <button
              onClick={handleClear}
              className="btn btn-ghost btn-sm"
              style={{ padding: '0.375rem', color: 'var(--color-fg-secondary)' }}
              title="Clear"
              disabled={!value}
            >
              <Trash2 size={16} />
            </button>
          )}

          <button
            onClick={handleCopy}
            className="btn btn-ghost btn-sm"
            style={{
              padding: '0.375rem',
              color: copied ? 'var(--color-success)' : 'var(--color-fg-secondary)',
            }}
            title="Copy to clipboard"
            disabled={!value}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>

          {onDownload && (
            <button
              onClick={onDownload}
              className="btn btn-ghost btn-sm"
              style={{ padding: '0.375rem', color: 'var(--color-fg-secondary)' }}
              title="Download"
              disabled={!value}
            >
              <Download size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          spellCheck={false}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            resize: 'none',
            border: 'none',
            padding: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: 'var(--color-code-fg)',
            backgroundColor: 'var(--color-code-bg)',
            outline: 'none',
            whiteSpace: wrap ? 'pre-wrap' : 'pre',
            overflow: 'auto',
          }}
        />
      </div>
    </div>
  );
}
