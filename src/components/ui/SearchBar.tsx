import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchTools } from '../../data/tools';
import type { Tool } from '../../types/tool';
import { LucideIcon } from './LucideIcon';

interface SearchBarProps {
  variant?: 'navbar' | 'hero';
  placeholder?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  variant = 'navbar',
  placeholder = 'Search developer tools...',
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tool[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.trim()) {
      setResults(searchTools(value).slice(0, 8));
      setIsOpen(true);
      setActiveIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, []);

  const handleSelect = useCallback(
    (tool: Tool) => {
      navigate(`/tools/${tool.slug}`);
      setQuery('');
      setIsOpen(false);
      inputRef.current?.blur();
    },
    [navigate]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && results[activeIndex]) {
            handleSelect(results[activeIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    },
    [isOpen, results, activeIndex, handleSelect]
  );

  // Global "/" shortcut to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !e.ctrlKey &&
        !e.metaKey &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isHero = variant === 'hero';

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: isHero ? '100%' : undefined,
        maxWidth: isHero ? '560px' : '280px',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Search
          size={isHero ? 20 : 16}
          style={{
            position: 'absolute',
            left: isHero ? '1rem' : '0.75rem',
            color: isHero ? 'var(--color-fg-faint)' : 'var(--color-navbar-fg-secondary)',
            pointerEvents: 'none',
          }}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label="Search developer tools"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          className="input"
          style={{
            paddingLeft: isHero ? '2.75rem' : '2.25rem',
            paddingRight: query ? '2.25rem' : isHero ? '4rem' : '2.25rem',
            fontSize: isHero ? '1rem' : '0.8125rem',
            height: isHero ? '3.25rem' : '2.25rem',
            borderRadius: isHero ? 'var(--radius-lg)' : 'var(--radius-md)',
            backgroundColor: isHero ? 'var(--color-card)' : 'var(--color-navbar-search-bg)',
            color: isHero ? 'var(--color-fg)' : 'var(--color-navbar-fg)',
            boxShadow: isHero ? 'var(--shadow-lg)' : 'none',
          }}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            style={{
              position: 'absolute',
              right: isHero ? '1rem' : '0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isHero ? 'var(--color-fg-faint)' : 'var(--color-navbar-fg-secondary)',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={16} />
          </button>
        )}
        {!query && !isHero && (
          <kbd
            style={{
              position: 'absolute',
              right: '0.5rem',
              fontSize: '0.6875rem',
              fontFamily: 'var(--font-mono)',
              padding: '0.125rem 0.375rem',
              borderRadius: 'var(--radius-sm)',
              border: `1px solid ${isHero ? 'var(--color-border)' : 'var(--color-navbar-border)'}`,
              color: isHero ? 'var(--color-fg-faint)' : 'var(--color-navbar-fg-secondary)',
              backgroundColor: isHero ? 'var(--color-bg-tertiary)' : 'var(--color-navbar-search-bg)',
              lineHeight: 1.4,
            }}
          >
            /
          </kbd>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.5rem',
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 'var(--z-dropdown)',
            overflow: 'hidden',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          {results.map((tool, i) => (
            <button
              key={tool.id}
              role="option"
              aria-selected={i === activeIndex}
              onClick={() => handleSelect(tool)}
              onMouseEnter={() => setActiveIndex(i)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                background: i === activeIndex ? 'var(--color-bg-tertiary)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'var(--color-fg)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                transition: 'background var(--transition-fast)',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2rem',
                  height: '2rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  flexShrink: 0,
                }}
              >
                <LucideIcon name={tool.icon} size={16} />
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 500, lineHeight: 1.3 }}>{tool.name}</div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-fg-muted)',
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tool.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {isOpen && query.trim() && results.length === 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.5rem',
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 'var(--z-dropdown)',
            padding: '1.5rem',
            textAlign: 'center',
            color: 'var(--color-fg-muted)',
            fontSize: '0.875rem',
          }}
        >
          No tools found for "{query}"
        </div>
      )}
    </div>
  );
}
