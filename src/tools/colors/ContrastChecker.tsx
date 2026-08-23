import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result ? {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16)
  } : null;
};

const calculateLuminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return (a[0] as number) * 0.2126 + (a[1] as number) * 0.7152 + (a[2] as number) * 0.0722;
};

const calculateRatio = (l1: number, l2: number) => {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

export default function ContrastChecker() {
  const [foreground, setForeground] = useState('#FFFFFF');
  const [background, setBackground] = useState('#000000');
  
  const [ratio, setRatio] = useState(21);
  const [isValidFg, setIsValidFg] = useState(true);
  const [isValidBg, setIsValidBg] = useState(true);

  useEffect(() => {
    const fgRgb = hexToRgb(foreground);
    const bgRgb = hexToRgb(background);
    
    setIsValidFg(!!fgRgb);
    setIsValidBg(!!bgRgb);

    if (fgRgb && bgRgb) {
      const l1 = calculateLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
      const l2 = calculateLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
      const newRatio = calculateRatio(l1, l2);
      setRatio(parseFloat(newRatio.toFixed(2)));
    }
  }, [foreground, background]);

  const StatusIcon = ({ pass }: { pass: boolean }) => {
    return pass ? <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} /> : <XCircle size={18} style={{ color: 'var(--color-error)' }} />;
  };

  const getStatusText = (ratio: number, target: number) => {
    return ratio >= target ? 'Pass' : 'Fail';
  };

  const getStatusColor = (ratio: number, target: number) => {
    return ratio >= target ? 'var(--color-success)' : 'var(--color-error)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <TwoPanelLayout>
        {/* Editor Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--color-bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-foreground)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Foreground Color
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="color"
                  value={isValidFg ? foreground : '#ffffff'}
                  onChange={(e) => setForeground(e.target.value.toUpperCase())}
                  style={{ width: '50px', height: '42px', padding: '0', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  className="input"
                  style={{ flex: 1, fontFamily: 'monospace', borderColor: isValidFg ? 'var(--color-border)' : 'var(--color-error)' }}
                  placeholder="#FFFFFF"
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-foreground)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Background Color
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="color"
                  value={isValidBg ? background : '#000000'}
                  onChange={(e) => setBackground(e.target.value.toUpperCase())}
                  style={{ width: '50px', height: '42px', padding: '0', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="input"
                  style={{ flex: 1, fontFamily: 'monospace', borderColor: isValidBg ? 'var(--color-border)' : 'var(--color-error)' }}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button 
                onClick={() => {
                  const temp = foreground;
                  setForeground(background);
                  setBackground(temp);
                }} 
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                Invert Colors
              </button>
            </div>
            
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', backgroundColor: 'var(--color-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <AlertCircle size={20} style={{ color: 'var(--color-muted-foreground)', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)', lineHeight: 1.5 }}>
              WCAG guidelines recommend a contrast ratio of at least <strong>4.5:1</strong> for normal text and <strong>3:1</strong> for large text (18pt+ or 14pt+ bold) to ensure readability for people with visual impairments.
            </div>
          </div>
          
        </div>

        {/* Results Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', minHeight: 0 }}>
          
          <div style={{ 
            backgroundColor: isValidBg ? background : 'var(--color-bg-secondary)', 
            color: isValidFg ? foreground : 'var(--color-foreground)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)',
            minHeight: '200px',
            transition: 'all 0.2s ease'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, border: 'none' }}>Large Text Preview</h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.5, margin: 0 }}>
              This is what normal sized text looks like on this background. Make sure you can read this comfortably.
            </p>
          </div>
          
          {isValidFg && isValidBg ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-muted-foreground)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Contrast Ratio</div>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-foreground)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {ratio}
                  <span style={{ fontSize: '1.5rem', color: 'var(--color-muted-foreground)', fontWeight: 600 }}>: 1</span>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--color-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-foreground)' }}>WCAG AA</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)' }}>Normal Text (4.5:1)</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: getStatusColor(ratio, 4.5) }}>
                      {getStatusText(ratio, 4.5)} <StatusIcon pass={ratio >= 4.5} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)' }}>Large Text (3:1)</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: getStatusColor(ratio, 3) }}>
                      {getStatusText(ratio, 3)} <StatusIcon pass={ratio >= 3} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--color-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-foreground)' }}>WCAG AAA</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)' }}>Normal Text (7:1)</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: getStatusColor(ratio, 7) }}>
                      {getStatusText(ratio, 7)} <StatusIcon pass={ratio >= 7} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)' }}>Large Text (4.5:1)</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: getStatusColor(ratio, 4.5) }}>
                      {getStatusText(ratio, 4.5)} <StatusIcon pass={ratio >= 4.5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-border)', color: 'var(--color-error)' }}>
              Invalid color format detected. Please enter valid HEX colors.
            </div>
          )}

        </div>
      </TwoPanelLayout>
    </div>
  );
}
