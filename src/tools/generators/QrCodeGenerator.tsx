import { useState, useRef, useEffect, useCallback } from 'react';
import { Download } from 'lucide-react';
import QRCode from 'qrcode';
import Select from '../../components/ui/Select';

export default function QrCodeGenerator() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = useCallback(async () => {
    if (!input.trim()) {
      setError('');
      // Clear canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      return;
    }

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      await QRCode.toCanvas(canvas, input, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to generate QR code');
      }
    }
  }, [input, size]);

  useEffect(() => {
    generate();
  }, [generate]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !input.trim()) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Controls */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1.25rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Text or URL</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input"
            placeholder="Enter text or URL to generate a QR code..."
            style={{
              height: '5rem',
              resize: 'vertical',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Size:</label>
            <Select
              options={[
                { label: '128px', value: 128 },
                { label: '256px', value: 256 },
                { label: '512px', value: 512 },
                { label: '1024px', value: 1024 },
              ]}
              value={size}
              onChange={(val) => setSize(Number(val))}
              style={{ width: '120px', height: '2.25rem' }}
            />
          </div>


          {input.trim() && !error && (
            <button onClick={handleDownload} className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Download size={16} />
              Download PNG
            </button>
          )}
        </div>
      </div>

      {/* QR Code Preview */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          minHeight: '320px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {error ? (
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--color-error-light)',
              color: 'var(--color-error)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              border: '1px solid var(--color-error)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Error: {error}
          </div>
        ) : !input.trim() ? (
          <div style={{ color: 'var(--color-fg-muted)', fontSize: '0.9375rem', textAlign: 'center' }}>
            Enter text or a URL above to generate a QR code
          </div>
        ) : null}

        <canvas
          ref={canvasRef}
          style={{
            display: input.trim() && !error ? 'block' : 'none',
            borderRadius: 'var(--radius-md)',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
    </div>
  );
}
