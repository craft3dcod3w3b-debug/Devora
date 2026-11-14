import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeContext } from '../../context/ThemeContext';
import type { ThemeMode } from '../../types/tool';

export default function ThemeToggle() {
  const { theme, cycleTheme } = useThemeContext();

  const iconMap: Record<ThemeMode, React.ReactNode> = {
    light: <Sun size={17} />,
    dark: <Moon size={17} />,
    system: <Monitor size={17} />,
  };

  const labelMap: Record<ThemeMode, string> = {
    light: 'Light mode',
    dark: 'Dark mode',
    system: 'System theme',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
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
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        transition: 'all 200ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
        e.currentTarget.style.color = 'var(--color-fg)';
        e.currentTarget.style.borderColor = 'var(--color-border-strong)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
        e.currentTarget.style.color = 'var(--color-navbar-fg-secondary)';
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
    >
      {iconMap[theme]}
    </motion.button>
  );
}
