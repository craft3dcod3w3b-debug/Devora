import { useState, useMemo } from 'react';

function int2ip(ipInt: number) {
  return `${(ipInt >>> 24) & 255}.${(ipInt >>> 16) & 255}.${(ipInt >>> 8) & 255}.${ipInt & 255}`;
}

function ip2int(ip: string) {
  return ip.split('.').reduce((ipInt, octet) => (ipInt << 8) + parseInt(octet, 10), 0) >>> 0;
}

export default function SubnetCalculator() {
  const [ipInput, setIpInput] = useState('192.168.1.0');
  const [cidr, setCidr] = useState(24);
  const [error, setError] = useState('');

  const result = useMemo(() => {
    try {
      const parts = ipInput.split('.');
      if (parts.length !== 4) throw new Error('Invalid IP format');
      if (parts.some(p => isNaN(Number(p)) || Number(p) < 0 || Number(p) > 255)) throw new Error('Invalid IP octet');
      
      const ipInt = ip2int(ipInput);
      const maskInt = ~((1 << (32 - cidr)) - 1) >>> 0;
      
      const networkInt = (ipInt & maskInt) >>> 0;
      const broadcastInt = (networkInt | ~maskInt) >>> 0;
      
      const firstHostInt = networkInt + 1;
      const lastHostInt = broadcastInt - 1;
      
      const totalHosts = broadcastInt - networkInt + 1;
      const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0;
      
      setError('');
      return {
        ip: ipInput,
        mask: int2ip(maskInt),
        network: int2ip(networkInt),
        broadcast: int2ip(broadcastInt),
        firstHost: totalHosts > 2 ? int2ip(firstHostInt) : 'N/A',
        lastHost: totalHosts > 2 ? int2ip(lastHostInt) : 'N/A',
        totalHosts,
        usableHosts
      };
    } catch (e) {
      setError('Invalid IP address format. Use IPv4 format (e.g., 192.168.1.0).');
      return null;
    }
  }, [ipInput, cidr]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1.5rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--color-fg-secondary)' }}>
            IP Address
          </label>
          <input
            type="text"
            className="input"
            value={ipInput}
            onChange={(e) => setIpInput(e.target.value)}
            placeholder="192.168.1.0"
            style={{ width: '100%' }}
          />
        </div>
        
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--color-fg-secondary)' }}>
            CIDR Prefix (/{cidr})
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="range"
              min="0"
              max="32"
              value={cidr}
              onChange={(e) => setCidr(Number(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--color-primary)' }}
            />
            <span style={{ fontWeight: 600, width: '2rem', textAlign: 'right' }}>/{cidr}</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', padding: '1.5rem', overflowY: 'auto' }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem' }}>Subnet Details</h3>
        
        {error ? (
          <div style={{ color: 'var(--color-error)', padding: '1rem', backgroundColor: 'var(--color-error-light)', borderRadius: 'var(--radius-md)' }}>
            {error}
          </div>
        ) : result ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Network Address</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{result.network}</div>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Subnet Mask</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{result.mask}</div>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Usable Host Range</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                {result.usableHosts > 0 ? `${result.firstHost} - ${result.lastHost}` : 'None'}
              </div>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Broadcast Address</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{result.broadcast}</div>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Usable Hosts</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{result.usableHosts.toLocaleString()}</div>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Total Hosts</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{result.totalHosts.toLocaleString()}</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
