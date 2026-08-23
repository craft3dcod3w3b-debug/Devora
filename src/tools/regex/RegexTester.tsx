import { useState, useMemo } from 'react';
import { SinglePanelLayout, TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import { AlertTriangle, Regex } from 'lucide-react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('[a-z]+');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('Hello world! testing 123');

  const { regex, error, matches } = useMemo(() => {
    if (!pattern) return { regex: null, error: null, matches: [] };

    try {
      const re = new RegExp(pattern, flags);
      
      const results: { match: string; index: number; groups: string[] }[] = [];
      let match;

      if (re.global) {
        // Prevent infinite loops if regex matches empty string
        if (re.test('')) {
           return { regex: null, error: 'Regex matches empty string, which causes infinite loops in global mode.', matches: [] };
        }
        
        // Reset lastIndex just in case
        re.lastIndex = 0;
        let safeCounter = 0;
        while ((match = re.exec(testString)) !== null && safeCounter < 5000) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          safeCounter++;
        }
      } else {
        match = re.exec(testString);
        if (match) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      return { regex: re, error: null, matches: results };
    } catch (e: any) {
      return { regex: null, error: e.message, matches: [] };
    }
  }, [pattern, flags, testString]);

  // Generate highlighted text
  const highlightedText = useMemo(() => {
    if (!regex || matches.length === 0 || !testString) return testString;

    let elements = [];
    let lastIndex = 0;

    matches.forEach((m, i) => {
      // Add text before match
      if (m.index > lastIndex) {
        elements.push(<span key={`text-${i}`}>{testString.substring(lastIndex, m.index)}</span>);
      }
      
      // Add highlighted match
      elements.push(
        <mark 
          key={`match-${i}`} 
          style={{ 
            backgroundColor: 'var(--color-primary)', 
            color: 'white',
            borderRadius: '2px',
            padding: '0 2px',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
          }}
        >
          {m.match}
        </mark>
      );
      
      lastIndex = m.index + m.match.length;
    });

    // Add remaining text
    if (lastIndex < testString.length) {
      elements.push(<span key="text-end">{testString.substring(lastIndex)}</span>);
    }

    return elements;
  }, [regex, matches, testString]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SinglePanelLayout minHeight="auto">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-foreground)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Regex size={18} style={{ color: 'var(--color-primary)' }} /> Regular Expression
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRight: 'none', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)', padding: '0 1rem', color: 'var(--color-muted-foreground)', fontWeight: 'bold' }}>
              /
            </div>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="input"
              style={{ flex: 1, borderRadius: '0', fontFamily: 'monospace', fontSize: '1rem', borderLeft: 'none', borderRight: 'none' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderLeft: 'none', borderRight: 'none', padding: '0 0.5rem', color: 'var(--color-muted-foreground)', fontWeight: 'bold' }}>
              /
            </div>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="gmi"
              className="input"
              style={{ width: '80px', borderRadius: '0 var(--radius-md) var(--radius-md) 0', fontFamily: 'monospace', fontSize: '1rem', borderLeft: '1px solid var(--color-border)' }}
            />
          </div>
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              <AlertTriangle size={16} />
              <span>{error}</span>
            </div>
          )}
        </div>
      </SinglePanelLayout>

      <TwoPanelLayout>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <CodeEditor
            value={testString}
            onChange={setTestString}
            title="Test String"
            language="plaintext"
            wrap={true}
            minHeight="300px"
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', minHeight: 0 }}>
          {/* Highlight Viewer */}
          <div style={{ flex: '0 0 auto', maxHeight: '250px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', padding: '1rem', overflowY: 'auto', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.875rem', minHeight: '100px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted-foreground)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Highlight Preview</div>
            {highlightedText}
          </div>

          {/* Matches List */}
          <div style={{ flex: 1, backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflowY: 'auto', minHeight: '200px' }}>
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted-foreground)', textTransform: 'uppercase', position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-secondary)', zIndex: 1 }}>
              Matches ({matches.length})
            </div>
            
            {matches.length === 0 && !error ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-muted-foreground)', fontSize: '0.875rem' }}>
                No matches found
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {matches.map((m, i) => (
                  <div key={i} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)' }}>Match {i + 1}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)' }}>Index: {m.index} - {m.index + m.match.length}</span>
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', wordBreak: 'break-all', backgroundColor: 'var(--color-bg)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                      {m.match}
                    </div>
                    {m.groups.length > 0 && (
                      <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {m.groups.map((g, gi) => (
                          <div key={gi} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
                            <span style={{ color: 'var(--color-muted-foreground)', width: '60px' }}>Group {gi + 1}:</span>
                            <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{g || 'undefined'}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </TwoPanelLayout>
    </div>
  );
}
