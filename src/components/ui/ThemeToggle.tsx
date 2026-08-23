import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeContext } from '../../context/ThemeContext';
import type { ThemeMode } from '../../types/tool';

export default function ThemeToggle() {
  const { theme, cycleTheme } = useThemeContext();

  const iconMap: Record<ThemeMode, React.ReactNode> = {
    light: <Sun size={18} />,
    dark: <Moon size={18} />,
    system: <Monitor size={18} />,
  };

  const labelMap: Record<ThemeMode, string> = {
    light: 'Light mode',
    dark: 'Dark mode',
    system: 'System theme',
  };

  return (
    <button
      onClick={cycleTheme}
      aria-label={`Current: ${labelMap[theme]}. Click to cycle theme.`}
      title={labelMap[theme]}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2.25rem',
        height: '2.25rem',
        padding: '0',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        color: 'var(--color-navbar-fg-secondary)',
        background: 'transparent',
        border: 'none',
        transition: 'background-color var(--transition-fast), color var(--transition-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.color = 'var(--color-navbar-fg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'var(--color-navbar-fg-secondary)';
      }}
    >
      {iconMap[theme]}
    </button>
  );
}
