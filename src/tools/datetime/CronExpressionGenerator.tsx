import { useState, useEffect } from 'react';
import { SinglePanelLayout } from '../../components/layout/ToolLayout';
import { Timer, Copy, Check } from 'lucide-react';
import Select from '../../components/ui/Select';

const DOW_MAP = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTH_MAP = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const formatTime = (h: string, m: string) => {
  const hr = parseInt(h, 10);
  const mn = m.padStart(2, '0');
  const period = hr >= 12 ? 'PM' : 'AM';
  const displayHr = hr % 12 || 12;
  return `${displayHr}:${mn} ${period}`;
};

const validateCronPart = (value: string, min: number, max: number, name: string) => {
  if (value === '*') return null;
  
  const components = value.split(',');
  if (value.includes(',') && components.some(c => c === '')) {
    return `Invalid cron expression: ${name} incomplete list after comma.`;
  }
  
  if (value.includes(',') && value.includes('/')) {
    return `Invalid cron expression: ${name} lists cannot contain step values.`;
  }
  
  for (const comp of components) {
    if (comp.includes('/')) {
      const parts = comp.split('/');
      if (parts.length !== 2 || parts[0] === '' || parts[1] === '') {
        return `Invalid cron expression: ${name} step format is invalid.`;
      }
      
      const stepValue = parseInt(parts[1], 10);
      if (!/^\d+$/.test(parts[1]) || isNaN(stepValue) || stepValue <= 0) {
        return `Invalid cron expression: ${name} step value must be a positive integer greater than 0.`;
      }
      
      if (parts[0] !== '*') {
        if (parts[0].includes('-')) {
          const rangeParts = parts[0].split('-');
          if (rangeParts.length !== 2 || rangeParts[0] === '' || rangeParts[1] === '') {
            return `Invalid cron expression: ${name} range format is invalid.`;
          }
          if (!/^\d+$/.test(rangeParts[0]) || !/^\d+$/.test(rangeParts[1])) {
             return `Invalid cron expression: ${name} range format is invalid.`;
          }
          const start = parseInt(rangeParts[0], 10);
          const end = parseInt(rangeParts[1], 10);
          if (isNaN(start) || isNaN(end) || start < min || end > max) {
            return `Invalid cron expression: ${name} must be between ${min} and ${max}.`;
          }
          if (start > end) {
            return `Invalid cron expression: ${name} range start value must be less than or equal to end value.`;
          }
        } else {
          if (!/^\d+$/.test(parts[0])) {
            return `Invalid cron expression: ${name} contains invalid number format.`;
          }
          const val = parseInt(parts[0], 10);
          if (isNaN(val) || val < min || val > max) {
            return `Invalid cron expression: ${name} must be between ${min} and ${max}.`;
          }
        }
      }
    } else if (comp.includes('-')) {
      const parts = comp.split('-');
      if (parts.length !== 2 || parts[0] === '' || parts[1] === '') {
        return `Invalid cron expression: ${name} range format is invalid.`;
      }
      
      if (!/^\d+$/.test(parts[0]) || !/^\d+$/.test(parts[1])) {
         return `Invalid cron expression: ${name} range format is invalid.`;
      }
      
      const start = parseInt(parts[0], 10);
      const end = parseInt(parts[1], 10);
      if (isNaN(start) || isNaN(end) || start < min || end > max) {
        return `Invalid cron expression: ${name} must be between ${min} and ${max}.`;
      }
      if (start > end) {
        return `Invalid cron expression: ${name} range start value must be less than or equal to end value.`;
      }
    } else {
      if (!/^\d+$/.test(comp)) {
        return `Invalid cron expression: ${name} contains invalid number format.`;
      }
      const val = parseInt(comp, 10);
      if (isNaN(val) || val < min || val > max) {
        return `Invalid cron expression: ${name} must be between ${min} and ${max}.`;
      }
    }
  }
  
  return null;
};

const describeCronField = (value: string, type: string, map?: string[]) => {
  if (value === '*') return 'every ' + type;
  
  const mapValue = (val: string) => {
    const num = parseInt(val, 10);
    return map && map[num] ? map[num] : val;
  };

  if (value.startsWith('*/')) {
    const num = value.substring(2);
    if (type === 'minute') return `Every ${num} minutes`;
    if (type === 'hour') return `Every ${num} hours`;
    return `every ${num} ${type}s`;
  }
  
  if (value.includes('-')) {
    const [start, end] = value.split('-');
    if (type === 'day of the week' || type === 'month') return `${mapValue(start)} through ${mapValue(end)}`;
    return `from ${type} ${mapValue(start)} through ${mapValue(end)}`;
  }

  if (value.includes(',')) {
    const vals = value.split(',').map(mapValue);
    if (type === 'day of the week' || type === 'month') return vals.join(' and ');
    return `at ${type}s ${vals.join(' and ')}`;
  }

  if (type === 'day of the week' || type === 'month') return mapValue(value);
  
  return `at ${type} ${value}`;
};

const translateCron = (cron: string) => {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) {
    return 'Invalid format. Must have exactly 5 parts separated by spaces.';
  }

  const [min, hour, dom, mon, dow] = parts as [string, string, string, string, string];
  
  const validRegex = /^[\d\*\/\-\,]+$/;
  if (!parts.every(p => validRegex.test(p))) {
      return 'Contains invalid characters. Only numbers, *, /, -, and , are allowed.';
  }

  const errMin = validateCronPart(min, 0, 59, 'Minute');
  if (errMin) return errMin;
  const errHour = validateCronPart(hour, 0, 23, 'Hour');
  if (errHour) return errHour;
  const errDom = validateCronPart(dom, 1, 31, 'Day of Month');
  if (errDom) return errDom;
  const errMon = validateCronPart(mon, 1, 12, 'Month');
  if (errMon) return errMon;
  const errDow = validateCronPart(dow, 0, 7, 'Day of Week');
  if (errDow) return errDow;

  let timeStr = '';
  if (min === '*' && hour === '*') {
    timeStr = 'Every minute';
  } else if (min !== '*' && hour === '*') {
    if (min.startsWith('*/')) {
      timeStr = describeCronField(min, 'minute');
    } else {
      timeStr = `At minute ${min} past every hour`;
    }
  } else if (min === '*' && hour !== '*') {
    timeStr = `Every minute of hour ${hour}`;
  } else if (min !== '*' && hour !== '*') {
    if (min.includes('/') || hour.includes('/') || min.includes('-') || hour.includes('-') || min.includes(',') || hour.includes(',')) {
       timeStr = `At ${describeCronField(min, 'minute')} and ${describeCronField(hour, 'hour')}`;
    } else {
       timeStr = `At ${formatTime(hour, min)}`;
    }
  }

  let dateStr = '';
  if (dom === '*' && mon === '*' && dow === '*') {
    if (min !== '*' && hour !== '*' && !timeStr.startsWith('At ')) {
      // e.g. if timeStr was generated differently
    } else if (min !== '*' && hour !== '*' && !min.includes('/') && !hour.includes('/') && !min.includes('-') && !hour.includes('-') && !min.includes(',') && !hour.includes(',')) {
      timeStr = 'Every day ' + timeStr.charAt(0).toLowerCase() + timeStr.slice(1);
    }
  } else {
    const conditions = [];
    if (dow !== '*') conditions.push(describeCronField(dow, 'day of the week', DOW_MAP));
    if (dom !== '*') conditions.push(describeCronField(dom, 'day of the month'));
    if (mon !== '*') conditions.push('in ' + describeCronField(mon, 'month', MONTH_MAP));
    
    dateStr = conditions.length > 0 ? ', ' + conditions.join(', ') : '';
  }

  // Capitalize first letter properly
  const result = timeStr + dateStr;
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export default function CronExpressionGenerator() {
  const [cron, setCron] = useState('0 12 * * *');
  const [description, setDescription] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDescription(translateCron(cron));
  }, [cron]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cron);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
  };

  const setCronPart = (index: number, value: string) => {
    const parts = cron.split(/\s+/);
    if (parts.length === 5) {
      parts[index] = value;
      setCron(parts.join(' '));
    }
  };

  const getCronPart = (index: number) => {
    const parts = cron.split(/\s+/);
    return parts.length === 5 ? parts[index] : '*';
  };

  const CronBuilderSelect = ({ label, index, options }: { label: string, index: number, options: { label: string, value: string }[] }) => {
    const currentValue = getCronPart(index);
    const isCustom = !options.some(o => o.value === currentValue) && currentValue !== undefined;

    const selectOptions = [...options];
    if (isCustom) {
      selectOptions.push({ label: `Custom (${currentValue})`, value: 'custom' });
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-foreground)' }}>{label}</label>
        <Select
          value={isCustom ? 'custom' : (currentValue || '*')}
          onChange={(val) => {
            if (val !== 'custom') {
              setCronPart(index, val);
            }
          }}
          options={selectOptions}
          style={{ width: '100%', height: '2.5rem' }}
        />
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SinglePanelLayout>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--color-bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: 600, color: 'var(--color-foreground)' }}>
              <Timer size={20} style={{ color: 'var(--color-primary)' }} />
              Cron Expression
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={cron}
                onChange={(e) => setCron(e.target.value)}
                className="input"
                style={{ flex: 1, fontFamily: 'monospace', fontSize: '1.25rem', padding: '0.75rem', textAlign: 'center', letterSpacing: '2px' }}
              />
              <button onClick={handleCopy} className="button button-primary" style={{ padding: '0 1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            
            <div style={{ marginTop: '0.5rem', padding: '1rem', backgroundColor: 'var(--color-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted-foreground)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Meaning</div>
              <div style={{ fontSize: '1.125rem', color: description.startsWith('Invalid') || description.startsWith('Contains') ? 'var(--color-error)' : 'var(--color-success)', fontWeight: 500 }}>
                {description}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <CronBuilderSelect
              label="Minute"
              index={0}
              options={[
                { label: 'Every minute (*)', value: '*' },
                { label: 'Even minutes (*/2)', value: '*/2' },
                { label: 'Every 5 minutes (*/5)', value: '*/5' },
                { label: 'Every 15 minutes (*/15)', value: '*/15' },
                { label: 'Every 30 minutes (*/30)', value: '*/30' },
                { label: 'At minute 0 (0)', value: '0' },
              ]}
            />
            <CronBuilderSelect
              label="Hour"
              index={1}
              options={[
                { label: 'Every hour (*)', value: '*' },
                { label: 'Even hours (*/2)', value: '*/2' },
                { label: 'Every 6 hours (*/6)', value: '*/6' },
                { label: 'Every 12 hours (*/12)', value: '*/12' },
                { label: 'At midnight (0)', value: '0' },
                { label: 'At noon (12)', value: '12' },
              ]}
            />
            <CronBuilderSelect
              label="Day of Month"
              index={2}
              options={[
                { label: 'Every day (*)', value: '*' },
                { label: 'Every 2 days (*/2)', value: '*/2' },
                { label: '1st of month (1)', value: '1' },
                { label: '15th of month (15)', value: '15' },
              ]}
            />
            <CronBuilderSelect
              label="Month"
              index={3}
              options={[
                { label: 'Every month (*)', value: '*' },
                { label: 'Every 3 months (*/3)', value: '*/3' },
                { label: 'Every 6 months (*/6)', value: '*/6' },
                { label: 'January (1)', value: '1' },
                { label: 'June (6)', value: '6' },
                { label: 'December (12)', value: '12' },
              ]}
            />
            <CronBuilderSelect
              label="Day of Week"
              index={4}
              options={[
                { label: 'Every day (*)', value: '*' },
                { label: 'Monday to Friday (1-5)', value: '1-5' },
                { label: 'Weekend (0,6)', value: '0,6' },
                { label: 'Sunday (0)', value: '0' },
                { label: 'Monday (1)', value: '1' },
              ]}
            />
          </div>

        </div>
      </SinglePanelLayout>
    </div>
  );
}
