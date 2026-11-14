import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  placeholder = 'Enter code or text here...',
  title,
  onDownload,
  onFileUpload,
  actions,
  wrap = false,
  minHeight = '320px',
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    if (!value) return null;
    const lines = value.split('\n').length;
    const chars = value.length;
    return `${lines} ${lines === 1 ? 'line' : 'lines'} • ${chars} chars`;
  }, [value]);

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
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Header / Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.625rem 0.875rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderBottom: '1px solid var(--color-border)',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          {title && (
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-fg)' }}>
              {title}
            </span>
          )}
          {language && (
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: 'var(--color-primary)',
                backgroundColor: 'var(--color-primary-light)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                padding: '0.125rem 0.45rem',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {language}
            </span>
          )}
          {stats && (
            <span
              style={{
                fontSize: '0.6875rem',
                color: 'var(--color-fg-faint)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {stats}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          {actions}
          
          {onFileUpload && !readOnly && (
            <label
              className="btn btn-ghost btn-sm"
              style={{ cursor: 'pointer', padding: '0.375rem 0.5rem', color: 'var(--color-fg-secondary)' }}
              title="Upload File"
            >
              <Upload size={15} />
              <input
                type="file"
                accept=".json,.txt,.csv,.xml,.sql,.yaml,.yml"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
          )}

          {!readOnly && (
            <button
              onClick={handleClear}
              className="btn btn-ghost btn-sm"
              style={{ padding: '0.375rem 0.5rem', color: 'var(--color-fg-secondary)' }}
              title="Clear text"
              disabled={!value}
            >
              <Trash2 size={15} />
            </button>
          )}

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            className="btn btn-ghost btn-sm"
            style={{
              padding: '0.375rem 0.625rem',
              color: copied ? 'var(--color-success)' : 'var(--color-fg-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
            title="Copy to clipboard"
            disabled={!value}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}
                >
                  <Check size={14} /> Copied
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}
                >
                  <Copy size={14} /> Copy
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {onDownload && (
            <button
              onClick={onDownload}
              className="btn btn-ghost btn-sm"
              style={{ padding: '0.375rem 0.5rem', color: 'var(--color-fg-secondary)' }}
              title="Download content"
              disabled={!value}
            >
              <Download size={15} />
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
            fontSize: '0.845rem',
            lineHeight: 1.65,
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
