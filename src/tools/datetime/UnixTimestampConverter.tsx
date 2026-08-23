import { useState, useEffect } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import { Clock, Calendar, Copy, Check } from 'lucide-react';
import Select from '../../components/ui/Select';

export default function UnixTimestampConverter() {
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  const [copiedCurrent, setCopiedCurrent] = useState(false);
  
  // Timestamp to Date state
  const [inputTimestamp, setInputTimestamp] = useState(String(Math.floor(Date.now() / 1000)));
  const [timestampUnit, setTimestampUnit] = useState<'auto' | 'seconds' | 'milliseconds'>('auto');
  
  // Date to Timestamp state
  const [inputDate, setInputDate] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // YYYY-MM-DDThh:mm
  });

  // Live timer for current epoch
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCurrent = async () => {
    try {
      await navigator.clipboard.writeText(String(currentEpoch));
      setCopiedCurrent(true);
      setTimeout(() => setCopiedCurrent(false), 2000);
    } catch (err) {}
  };

  // Convert Timestamp -> Date
  let tsDateResult: Date | null = null;
  let tsParsedSec: number | null = null;
  let tsParsedMs: number | null = null;
  let tsError = '';
  try {
    const num = parseInt(inputTimestamp, 10);
    if (!isNaN(num)) {
      let isMs = false;
      if (timestampUnit === 'auto') {
        // 11 digits or less is treated as seconds (up to year 5138)
        // 12 digits or more is treated as milliseconds
        isMs = Math.abs(num) > 99999999999;
      } else {
        isMs = timestampUnit === 'milliseconds';
      }

      tsDateResult = new Date(isMs ? num : num * 1000);
      
      if (isNaN(tsDateResult.getTime())) {
        tsDateResult = null;
        tsError = 'Invalid timestamp';
      } else {
        tsParsedMs = tsDateResult.getTime();
        tsParsedSec = Math.floor(tsParsedMs / 1000);
      }
    } else if (inputTimestamp.trim() !== '') {
      tsError = 'Invalid timestamp';
    }
  } catch (e) {
    tsError = 'Error parsing timestamp';
  }

  // Convert Date -> Timestamp
  let dtTimestampResultSec: number | null = null;
  let dtTimestampResultMs: number | null = null;
  let dtError = '';
  try {
    const d = new Date(inputDate);
    if (!isNaN(d.getTime())) {
      dtTimestampResultMs = d.getTime();
      dtTimestampResultSec = Math.floor(d.getTime() / 1000);
    } else if (inputDate.trim() !== '') {
      dtError = 'Invalid date format';
    }
  } catch (e) {
    dtError = 'Error parsing date';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Current Epoch Banner */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Clock size={20} style={{ color: 'var(--color-primary)' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-muted-foreground)' }}>Current Unix Epoch:</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-foreground)', fontFamily: 'monospace' }}>{currentEpoch}</span>
        </div>
        <button onClick={handleCopyCurrent} className="button button-ghost" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {copiedCurrent ? <Check size={16} style={{ color: 'var(--color-success)' }} /> : <Copy size={16} />}
          <span style={{ fontSize: '0.875rem' }}>{copiedCurrent ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      <TwoPanelLayout>
        
        {/* Panel 1: Timestamp to Date */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-foreground)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} /> Timestamp to Date
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)', marginTop: '0.25rem' }}>Convert a Unix timestamp to human-readable date.</p>
          </div>
          
          <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--color-foreground)' }}>Unix Timestamp</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={inputTimestamp}
                  onChange={(e) => setInputTimestamp(e.target.value)}
                  className="input"
                  style={{ flex: 1, fontFamily: 'monospace' }}
                  placeholder="e.g. 1704067200"
                />
                <Select
                  value={timestampUnit}
                  onChange={(val) => setTimestampUnit(val as any)}
                  options={[
                    { label: 'Auto-detect', value: 'auto' },
                    { label: 'Seconds', value: 'seconds' },
                    { label: 'Milliseconds', value: 'milliseconds' },
                  ]}
                  style={{ width: '160px' }}
                />
              </div>
            </div>

            {tsError && <div style={{ color: 'var(--color-error)', fontSize: '0.875rem' }}>{tsError}</div>}

            {tsDateResult && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted-foreground)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Seconds</div>
                    <div style={{ fontSize: '1rem', color: 'var(--color-foreground)', fontFamily: 'monospace' }}>{tsParsedSec}</div>
                  </div>
                  
                  <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted-foreground)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Milliseconds</div>
                    <div style={{ fontSize: '1rem', color: 'var(--color-foreground)', fontFamily: 'monospace' }}>{tsParsedMs}</div>
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted-foreground)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>UTC Time</div>
                  <div style={{ fontSize: '1rem', color: 'var(--color-foreground)', fontFamily: 'monospace' }}>{tsDateResult.toUTCString()}</div>
                </div>
                
                <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted-foreground)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Local Time</div>
                  <div style={{ fontSize: '1rem', color: 'var(--color-foreground)', fontFamily: 'monospace' }}>{tsDateResult.toString()}</div>
                </div>
                
                <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted-foreground)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>ISO 8601</div>
                  <div style={{ fontSize: '1rem', color: 'var(--color-foreground)', fontFamily: 'monospace' }}>{tsDateResult.toISOString()}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Panel 2: Date to Timestamp */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-foreground)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} /> Date to Timestamp
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)', marginTop: '0.25rem' }}>Convert a local date and time to a Unix timestamp.</p>
          </div>
          
          <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--color-foreground)' }}>Local Date & Time</label>
              <input
                type="datetime-local"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="input"
                style={{ width: '100%' }}
              />
            </div>

            {dtError && <div style={{ color: 'var(--color-error)', fontSize: '0.875rem' }}>{dtError}</div>}

            {dtTimestampResultSec !== null && dtTimestampResultMs !== null && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted-foreground)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Seconds</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'monospace' }}>{dtTimestampResultSec}</div>
                </div>
                
                <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted-foreground)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Milliseconds</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'monospace' }}>{dtTimestampResultMs}</div>
                </div>
              </div>
            )}
          </div>
        </div>

      </TwoPanelLayout>
    </div>
  );
}
