import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: SelectOption[];
  value: string | number;
  onChange: (value: any) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Select({ options, value, onChange, className = '', style }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', ...style }} className={className}>
      <button
        type="button"
        className="input"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'left',
          cursor: 'pointer',
          height: '100%',
        }}
      >
        <span>{selectedOption?.label}</span>
        <ChevronDown size={16} style={{ color: 'var(--color-fg-muted)', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none', marginLeft: '0.5rem' }} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.25rem',
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 'var(--z-dropdown)',
            maxHeight: '300px',
            overflowY: 'auto',
            padding: '0.375rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              tabIndex={0}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onChange(option.value);
                  setIsOpen(false);
                }
              }}
              className={`select-option ${option.value === value ? 'selected' : ''}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
