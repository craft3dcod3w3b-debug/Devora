import { useState } from 'react';
import { SinglePanelLayout } from '../../components/layout/ToolLayout';
import { Copy, Check } from 'lucide-react';

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16)
  } : null;
};

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
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

const hslToRgb = (h: number, s: number, l: number) => {
  let r, g, b;
  h /= 360;
  s /= 100;
  l /= 100;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

export default function ColorConverter() {
  const [hex, setHex] = useState('#6366F1');
  const [rgb, setRgb] = useState('rgb(99, 102, 241)');
  const [hsl, setHsl] = useState('hsl(239, 84%, 67%)');
  const [previewColor, setPreviewColor] = useState('#6366F1');

  const [hexError, setHexError] = useState('');
  const [rgbError, setRgbError] = useState('');
  const [hslError, setHslError] = useState('');

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {}
  };

  const updateFromHex = (value: string) => {
    setHex(value);
    
    let parsedHex = value.trim();
    if (!parsedHex.startsWith('#') && parsedHex.length >= 3 && parsedHex.length <= 6) {
      parsedHex = '#' + parsedHex;
    }
    
    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/i.test(parsedHex)) {
      setHexError('');
      // expand 3-digit hex to 6-digit hex for logic
      let expandedHex = parsedHex;
      if (parsedHex.length === 4) {
        expandedHex = '#' + parsedHex[1] + parsedHex[1] + parsedHex[2] + parsedHex[2] + parsedHex[3] + parsedHex[3];
      }
      
      const rgbObj = hexToRgb(expandedHex);
      if (rgbObj) {
        setRgb(`rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`);
        setRgbError('');
        const hslObj = rgbToHsl(rgbObj.r, rgbObj.g, rgbObj.b);
        setHsl(`hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`);
        setHslError('');
        setPreviewColor(expandedHex);
      }
    } else {
      setHexError('Invalid HEX color. Use format #RRGGBB.');
    }
  };

  const updateFromRgb = (value: string) => {
    setRgb(value);
    
    const rgbMatch = value.match(/^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]!, 10);
      const g = parseInt(rgbMatch[2]!, 10);
      const b = parseInt(rgbMatch[3]!, 10);
      
      if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
        setRgbError('');
        const hexVal = rgbToHex(r, g, b);
        setHex(hexVal);
        setHexError('');
        const hslObj = rgbToHsl(r, g, b);
        setHsl(`hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`);
        setHslError('');
        setPreviewColor(hexVal);
      } else {
        setRgbError('Invalid RGB color. Values must be between 0 and 255.');
      }
    } else {
      setRgbError('Invalid RGB color. Values must be between 0 and 255.');
    }
  };

  const updateFromHsl = (value: string) => {
    setHsl(value);
    
    const hslMatch = value.match(/^hsl\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*\)$/i);
    if (hslMatch) {
      const h = parseInt(hslMatch[1]!, 10);
      const s = parseInt(hslMatch[2]!, 10);
      const l = parseInt(hslMatch[3]!, 10);
      
      if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
        setHslError('');
        const rgbObj = hslToRgb(h, s, l);
        const hexVal = rgbToHex(rgbObj.r, rgbObj.g, rgbObj.b);
        setHex(hexVal);
        setHexError('');
        setRgb(`rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`);
        setRgbError('');
        setPreviewColor(hexVal);
      } else {
        setHslError('Invalid HSL color. Hue must be 0–360, saturation and lightness 0–100%.');
      }
    } else {
      setHslError('Invalid HSL color. Hue must be 0–360, saturation and lightness 0–100%.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SinglePanelLayout>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Color Preview Block */}
          <div style={{ 
            height: '150px', 
            borderRadius: 'var(--radius-lg)', 
            backgroundColor: previewColor,
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)',
            transition: 'background-color 0.2s ease'
          }}>
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.9)', 
              color: '#000', 
              padding: '0.5rem 1rem', 
              borderRadius: 'var(--radius-md)', 
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {previewColor.toUpperCase()}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-foreground)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                HEX
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  className="input"
                  placeholder="#000000"
                  style={{ flex: 1, fontFamily: 'monospace', fontSize: '1.125rem', borderColor: hexError ? 'var(--color-error)' : 'var(--color-border)' }}
                />
                <button 
                  onClick={() => handleCopy(hex, 'hex')} 
                  className="btn btn-secondary"
                  title="Copy HEX"
                >
                  {copiedField === 'hex' ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              {hexError && (
                <div style={{ fontSize: '0.875rem', color: 'var(--color-error)' }}>{hexError}</div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-foreground)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                RGB
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={rgb}
                  onChange={(e) => updateFromRgb(e.target.value)}
                  className="input"
                  placeholder="rgb(0, 0, 0)"
                  style={{ flex: 1, fontFamily: 'monospace', fontSize: '1.125rem', borderColor: rgbError ? 'var(--color-error)' : 'var(--color-border)' }}
                />
                <button 
                  onClick={() => handleCopy(rgb, 'rgb')} 
                  className="btn btn-secondary"
                  title="Copy RGB"
                >
                  {copiedField === 'rgb' ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              {rgbError && (
                <div style={{ fontSize: '0.875rem', color: 'var(--color-error)' }}>{rgbError}</div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-foreground)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                HSL
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={hsl}
                  onChange={(e) => updateFromHsl(e.target.value)}
                  className="input"
                  placeholder="hsl(0, 0%, 0%)"
                  style={{ flex: 1, fontFamily: 'monospace', fontSize: '1.125rem', borderColor: hslError ? 'var(--color-error)' : 'var(--color-border)' }}
                />
                <button 
                  onClick={() => handleCopy(hsl, 'hsl')} 
                  className="btn btn-secondary"
                  title="Copy HSL"
                >
                  {copiedField === 'hsl' ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              {hslError && (
                <div style={{ fontSize: '0.875rem', color: 'var(--color-error)' }}>{hslError}</div>
              )}
            </div>
          </div>
          
        </div>
      </SinglePanelLayout>
    </div>
  );
}
