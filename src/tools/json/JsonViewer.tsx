import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import Select from '../../components/ui/Select';
import { ChevronRight, ChevronDown } from 'lucide-react';

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject { [key: string]: JsonValue; }
type JsonArray = JsonValue[];

function JsonNode({ keyName, value, isLast, expandedLevel = 1, currentLevel = 0 }: { keyName?: string, value: JsonValue, isLast: boolean, expandedLevel?: number, currentLevel?: number }) {
  const [expanded, setExpanded] = useState(currentLevel < expandedLevel);

  // Update expansion when global prop changes
  useEffect(() => {
    setExpanded(currentLevel < expandedLevel);
  }, [expandedLevel, currentLevel]);

  const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
  const isArray = Array.isArray(value);
  const isComplex = isObject || isArray;

  const toggle = () => setExpanded(!expanded);

  const renderValue = () => {
    if (value === null) return <span style={{ color: 'var(--color-error)' }}>null</span>;
    if (typeof value === 'boolean') return <span style={{ color: 'var(--color-primary)' }}>{value.toString()}</span>;
    if (typeof value === 'number') return <span style={{ color: '#059669' }}>{value}</span>;
    if (typeof value === 'string') return <span style={{ color: '#d97706' }}>"{value}"</span>;
    return null;
  };

  const getBracket = (type: 'open' | 'close') => {
    if (isArray) return type === 'open' ? '[' : ']';
    return type === 'open' ? '{' : '}';
  };

  const isEmpty = isComplex && Object.keys(value as object).length === 0;

  return (
    <div style={{ paddingLeft: currentLevel === 0 ? '0' : '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', lineHeight: 1.6 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {isComplex && !isEmpty && (
          <button
            onClick={toggle}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: 'var(--color-fg-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1.25rem',
              height: '1.25rem',
              marginLeft: '-1.25rem',
              marginRight: '0.25rem',
              marginTop: '0.125rem'
            }}
          >
            {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
        <div style={{ marginLeft: (isComplex && !isEmpty) ? 0 : '0.25rem' }}>
          {keyName !== undefined && (
            <span style={{ color: 'var(--color-secondary)' }}>"{keyName}"</span>
          )}
          {keyName !== undefined && <span style={{ color: 'var(--color-fg)' }}>: </span>}
          
          {isComplex ? (
            <>
              <span style={{ color: 'var(--color-fg)' }}>{getBracket('open')}</span>
              {(!expanded && !isEmpty) && (
                <span style={{ color: 'var(--color-fg-muted)', fontStyle: 'italic', margin: '0 0.5rem', cursor: 'pointer' }} onClick={toggle}>
                  {isArray ? `${(value as any[]).length} items` : `${Object.keys(value as object).length} keys`}
                </span>
              )}
              {(!expanded || isEmpty) && (
                <span style={{ color: 'var(--color-fg)' }}>
                  {getBracket('close')}{!isLast && ','}
                </span>
              )}
            </>
          ) : (
            <>
              {renderValue()}
              {!isLast && <span style={{ color: 'var(--color-fg)' }}>,</span>}
            </>
          )}
        </div>
      </div>

      {isComplex && expanded && !isEmpty && (
        <div>
          {isArray ? (
            (value as JsonArray).map((item, index) => (
              <JsonNode
                key={index}
                value={item}
                isLast={index === (value as JsonArray).length - 1}
                expandedLevel={expandedLevel}
                currentLevel={currentLevel + 1}
              />
            ))
          ) : (
            Object.entries(value as JsonObject).map(([k, v], index, arr) => (
              <JsonNode
                key={k}
                keyName={k}
                value={v}
                isLast={index === arr.length - 1}
                expandedLevel={expandedLevel}
                currentLevel={currentLevel + 1}
              />
            ))
          )}
          <div style={{ color: 'var(--color-fg)', paddingLeft: '0.25rem' }}>
            {getBracket('close')}{!isLast && ','}
          </div>
        </div>
      )}
    </div>
  );
}

export default function JsonViewer() {
  const [input, setInput] = useState('');
  const [parsedData, setParsedData] = useState<JsonValue | undefined>(undefined);
  const [error, setError] = useState('');
  const [expandLevel, setExpandLevel] = useState(2); // 0=collapsed, 999=expand all

  useEffect(() => {
    if (!input.trim()) {
      setParsedData(undefined);
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setParsedData(parsed);
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid JSON');
      }
    }
  }, [input]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      {/* Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
        }}
      >
        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Expand Level:</span>
        <Select
          value={expandLevel}
          onChange={(val) => setExpandLevel(Number(val))}
          options={[
            { label: 'Level 1 (Root only)', value: 1 },
            { label: 'Level 2', value: 2 },
            { label: 'Level 3', value: 3 },
            { label: 'Level 4', value: 4 },
            { label: 'Expand All', value: 999 },
          ]}
          style={{ width: '180px', height: '2.25rem' }}
        />
      </div>

      <TwoPanelLayout>
        <CodeEditor
          value={input}
          onChange={setInput}
          title="JSON Input"
          language="JSON"
          placeholder="Paste JSON to view as tree..."
          onFileUpload={setInput}
        />
        
        <div
          style={{
            height: '100%',
            minHeight: '300px',
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '0.5rem 0.75rem',
              backgroundColor: 'var(--color-bg-secondary)',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-fg)' }}>
              Tree View
            </span>
          </div>

          <div style={{ flex: 1, overflow: 'auto', padding: '1rem', backgroundColor: 'var(--color-code-bg)' }}>
            {error ? (
              <div style={{ color: 'var(--color-error)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                Error: {error}
              </div>
            ) : parsedData !== undefined ? (
              <JsonNode value={parsedData} isLast={true} expandedLevel={expandLevel} />
            ) : (
              <div style={{ color: 'var(--color-fg-muted)', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
                Tree view will appear here...
              </div>
            )}
          </div>
        </div>
      </TwoPanelLayout>
    </div>
  );
}
