import { useState, useEffect } from 'react';
import { SinglePanelLayout } from '../../components/layout/ToolLayout';
import { Copy, Check, Pipette } from 'lucide-react';

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16)
  } : { r: 0, g: 0, b: 0 };
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const hslToHex = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  
  const a = s * Math.min(l, 1 - l);
  const f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  const rgbToHexStr = (r: number, g: number, b: number) => "#" + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
  return rgbToHexStr(f(0), f(8), f(4)).toUpperCase();
};

export default function ColorPicker() {
  const [hex, setHex] = useState('#3B82F6');
  const [rgbStr, setRgbStr] = useState('rgb(59, 130, 246)');
  const [hslStr, setHslStr] = useState('hsl(217, 91%, 60%)');
  const [shades, setShades] = useState<string[]>([]);
  
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {}
  };

  useEffect(() => {
    const rgb = hexToRgb(hex);
    setRgbStr(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setHslStr(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);

    // Generate shades/tints by adjusting lightness
    const newShades = [];
    for (let i = 10; i <= 90; i += 20) {
      newShades.push(hslToHex(hsl.h, hsl.s, i));
    }
    setShades(newShades);
  }, [hex]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SinglePanelLayout>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <div style={{ 
              position: 'relative', 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              border: '4px solid var(--color-border)',
              backgroundColor: hex
            }}>
              <input
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value.toUpperCase())}
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '-10px',
                  width: '170px',
                  height: '170px',
                  opacity: 0,
                  cursor: 'pointer'
                }}
                title="Click to pick a color"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                opacity: 0.5,
                mixBlendMode: 'overlay'
              }}>
                <Pipette size={48} color="#fff" />
              </div>
            </div>
            
            <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem' }}>
              Click the circle to pick a color
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            
            {/* Value cards */}
            {[
              { label: 'HEX', value: hex },
              { label: 'RGB', value: rgbStr },
              { label: 'HSL', value: hslStr }
            ].map((item, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.5rem',
                backgroundColor: 'var(--color-bg-secondary)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted-foreground)', textTransform: 'uppercase' }}>
                  {item.label}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 500 }}>{item.value}</span>
                  <button 
                    onClick={() => handleCopy(item.value)} 
                    className="button button-secondary"
                    style={{ padding: '0.25rem 0.5rem' }}
                    title={`Copy ${item.label}`}
                  >
                    {copiedText === item.value ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Shades Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-foreground)' }}>Color Shades</div>
            <div style={{ display: 'flex', gap: '0.5rem', height: '60px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              {shades.map((shade, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleCopy(shade)}
                  style={{ 
                    flex: 1, 
                    backgroundColor: shade,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.1s',
                    position: 'relative'
                  }}
                  title={`Copy ${shade}`}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{
                    position: 'absolute',
                    opacity: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    padding: '2px 4px',
                    borderRadius: '4px',
                    transition: 'opacity 0.2s',
                    pointerEvents: 'none'
                  }}>
                    {copiedText === shade ? 'Copied' : shade}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)', textAlign: 'center' }}>
              Click any shade to copy its HEX value
            </div>
          </div>

        </div>
      </SinglePanelLayout>
    </div>
  );
}
