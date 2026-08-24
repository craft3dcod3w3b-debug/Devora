import { useState, useEffect, useMemo } from 'react';
import CodeEditor from '../../components/ui/CodeEditor';
import { UAParser } from 'ua-parser-js';
import { Monitor, Smartphone, Globe, Cpu, Hash } from 'lucide-react';

export default function UserAgentParser() {
  const [userAgent, setUserAgent] = useState('');

  // Auto-populate with the user's current User-Agent string on mount
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setUserAgent(navigator.userAgent);
    }
  }, []);

  const parsedData = useMemo(() => {
    if (!userAgent.trim()) return null;
    try {
      const parser = new UAParser(userAgent);
      let parsed = parser.getResult();

      // Bot detection fallback
      // Matches popular bots or generic patterns containing "bot", "crawler", "spider"
      const botRegex = /(bingbot|googlebot|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|slackbot|telegrambot|applebot|discordbot|slurp|gptbot|claudebot|ahrefsbot|semrushbot)/i;
      const genericBotRegex = /([a-z0-9_-]*(?:bot|spider|crawler|scraper))[ \/]?v?([0-9.]+)?/i;

      let botName = '';
      let botVersion = '';

      const explicitMatch = userAgent.match(new RegExp(botRegex.source + '(?:\\/v?([0-9.]+))?', 'i'));
      if (explicitMatch && explicitMatch[1]) {
        botName = explicitMatch[1];
        botVersion = explicitMatch[2] || '';
      } else {
        const genericMatch = userAgent.match(genericBotRegex);
        if (genericMatch && genericMatch[1]) {
          botName = genericMatch[1];
          botVersion = genericMatch[2] || '';
        }
      }

      if (botName) {
        // Format name (e.g. "bingbot" -> "Bingbot")
        let formattedName = botName.charAt(0).toUpperCase() + botName.slice(1).toLowerCase();
        if (formattedName.includes('bot') && !formattedName.endsWith('Bot')) {
            formattedName = formattedName.replace('bot', 'Bot');
        } else if (formattedName.endsWith('bot')) {
            formattedName = formattedName.substring(0, formattedName.length - 3) + 'Bot';
        }
        if (formattedName === 'Facebookexternalhit') formattedName = 'Facebook Bot';
        
        parsed = {
          ...parsed,
          browser: {
            ...parsed.browser,
            name: formattedName,
            version: botVersion || parsed.browser.version,
          },
          device: {
            ...parsed.device,
            type: 'Bot / Crawler' as any,
            vendor: undefined,
            model: undefined,
          }
        };
      } else {
        // HTTP Client / CLI detection fallback
        const clientRegex = /(curl|wget|postmanruntime|httpie|python-requests|axios|go-http-client|java)/i;
        const clientMatch = userAgent.match(new RegExp(clientRegex.source + '(?:[ \\/]?v?([0-9.]+))?', 'i'));
        
        if (clientMatch && clientMatch[1]) {
          let clientName = clientMatch[1];
          let clientVersion = clientMatch[2] || '';
          
          // Format client name properly
          let formattedClient = clientName;
          if (clientName.toLowerCase() === 'postmanruntime') formattedClient = 'PostmanRuntime';
          else if (clientName.toLowerCase() === 'httpie') formattedClient = 'HTTPie';
          else if (clientName.toLowerCase() === 'python-requests') formattedClient = 'python-requests';
          else if (clientName.toLowerCase() === 'go-http-client') formattedClient = 'Go-http-client';
          else if (clientName.toLowerCase() === 'wget') formattedClient = 'Wget';
          else if (clientName.toLowerCase() === 'curl') formattedClient = 'curl';
          else if (clientName.toLowerCase() === 'java') formattedClient = 'Java HTTP Client';
          else formattedClient = clientName.charAt(0).toUpperCase() + clientName.slice(1).toLowerCase();
          
          parsed = {
            ...parsed,
            browser: {
              ...parsed.browser,
              name: formattedClient,
              version: clientVersion || parsed.browser.version,
            },
            device: {
              ...parsed.device,
              type: 'CLI / HTTP Client' as any,
              vendor: undefined,
              model: undefined,
            }
          };
        }
      }

      return parsed;
    } catch (e) {
      return null;
    }
  }, [userAgent]);

  const ItemCard = ({ icon: Icon, title, value, version }: { icon: any, title: string, value: string, version?: string }) => (
    <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-muted-foreground)' }}>
        <Icon size={18} />
        <span style={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</span>
      </div>
      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-foreground)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        {value || 'Unknown'}
        {version && (
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-primary)', backgroundColor: 'var(--color-primary)', opacity: 0.8, padding: '0.125rem 0.375rem', borderRadius: 'var(--radius-sm)', WebkitTextFillColor: 'white' }}>
            v{version}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ height: '120px', width: '100%' }}>
        <CodeEditor
          value={userAgent}
          onChange={setUserAgent}
          title="User-Agent String"
          placeholder="Paste a user-agent string here..."
          language="plaintext"
          wrap={true}
          minHeight="120px"
        />
      </div>

      {parsedData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <ItemCard 
            icon={Globe} 
            title="Browser" 
            value={parsedData.browser.name || 'Unknown'} 
            version={parsedData.browser.version} 
          />
          <ItemCard 
            icon={Monitor} 
            title="Operating System" 
            value={parsedData.os.name || 'Unknown'} 
            version={parsedData.os.version} 
          />
          <ItemCard 
            icon={Smartphone} 
            title="Device" 
            value={parsedData.device.vendor ? `${parsedData.device.vendor} ${parsedData.device.model || ''}`.trim() : (parsedData.device.type || 'Desktop')} 
          />
          <ItemCard 
            icon={Cpu} 
            title="Engine" 
            value={parsedData.engine.name || 'Unknown'} 
            version={parsedData.engine.version} 
          />
          <ItemCard 
            icon={Hash} 
            title="CPU Architecture" 
            value={parsedData.cpu.architecture || 'Unknown'} 
          />
        </div>
      )}

      {parsedData && (
        <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-foreground)' }}>Raw JSON Output</h3>
          <div style={{ height: '300px' }}>
            <CodeEditor
              value={JSON.stringify(parsedData, null, 2)}
              readOnly
              title="Parsed Data"
              language="JSON"
              wrap={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
