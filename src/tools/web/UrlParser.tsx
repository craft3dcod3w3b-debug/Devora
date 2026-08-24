import { useState, useMemo } from 'react';
import CodeEditor from '../../components/ui/CodeEditor';
import { LinkIcon, AlertCircle } from 'lucide-react';

export default function UrlParser() {
  const [urlInput, setUrlInput] = useState('https://developer.example.com:8080/path/to/resource?query=123&sort=asc#section-2');

  const parsedUrl = useMemo(() => {
    if (!urlInput.trim()) return null;
    
    const urlToParse = urlInput.trim();

    // Strict validation: forbid spaces and require a basic protocol:// structure before trying to parse
    if (/\s/.test(urlToParse) || !/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\/[^\s/$.?#].[^\s]*$/i.test(urlToParse)) {
      return { error: 'Invalid URL — Please enter a valid URL.' };
    }

    try {
      const url = new URL(urlToParse);
      
      const searchParams: Record<string, string> = {};
      url.searchParams.forEach((value, key) => {
        searchParams[key] = value;
      });

      return {
        href: url.href,
        protocol: url.protocol,
        host: url.host,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        origin: url.origin,
        username: url.username,
        password: url.password,
        searchParams,
        error: null,
      };
    } catch (e: any) {
      return { error: 'Invalid URL — Please enter a valid URL.' };
    }
  }, [urlInput]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--color-muted-foreground)' }}>
          <LinkIcon size={20} />
        </div>
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Enter a URL to parse (e.g. https://example.com/path?q=search)"
          className="input"
          style={{ width: '100%', paddingLeft: '3rem', paddingRight: '1rem', paddingTop: '1rem', paddingBottom: '1rem', fontSize: '1rem', fontFamily: 'monospace' }}
        />
      </div>

      {parsedUrl && parsedUrl.error ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-error)', color: 'var(--color-error)' }}>
          <AlertCircle size={20} />
          <span>{parsedUrl.error}</span>
        </div>
      ) : parsedUrl && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Main Components Table */}
          <div style={{ backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
                <tr>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--color-muted-foreground)', width: '30%' }}>Component</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--color-muted-foreground)' }}>Value</th>
                </tr>
              </thead>
              <tbody style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                {['protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash', 'origin', 'username', 'password'].map((key) => {
                  const val = (parsedUrl as any)[key];
                  if (!val) return null;
                  
                  return (
                    <tr key={key} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-primary)', fontWeight: 600 }}>{key}</td>
                      <td style={{ padding: '0.75rem 1rem', wordBreak: 'break-all', color: 'var(--color-foreground)' }}>{val}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Query Parameters Table */}
          {parsedUrl.searchParams && Object.keys(parsedUrl.searchParams).length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-foreground)' }}>Query Parameters</h3>
              <div style={{ backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
                    <tr>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--color-muted-foreground)', width: '30%' }}>Key</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--color-muted-foreground)' }}>Value</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                    {Object.entries(parsedUrl.searchParams).map(([key, val]) => (
                      <tr key={key} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--color-primary)', fontWeight: 600 }}>{key}</td>
                        <td style={{ padding: '0.75rem 1rem', wordBreak: 'break-all', color: 'var(--color-foreground)' }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-foreground)' }}>JSON Breakdown</h3>
            <div style={{ height: '300px' }}>
              <CodeEditor
                value={JSON.stringify(parsedUrl, null, 2)}
                readOnly
                title="Parsed URL JSON"
                language="JSON"
                wrap={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
