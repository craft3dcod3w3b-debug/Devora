import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { Tool } from '../../types/tool';
import { LucideIcon } from './LucideIcon';
import { getCategoryBySlug } from '../../data/categories';

interface ToolCardProps {
  tool: Tool;
  isFavorite?: boolean;
  onToggleFavorite?: (toolId: string) => void;
}

export default function ToolCard({ tool, isFavorite = false, onToggleFavorite }: ToolCardProps) {
  const category = getCategoryBySlug(tool.category);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="card card-interactive"
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.25rem',
      }}
    >
      {/* Clickable stretched overlay link */}
      <Link
        to={`/tools/${tool.slug}`}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
        aria-label={`Open ${tool.name}`}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '0.875rem',
          paddingRight: '2rem',
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.625rem',
            height: '2.625rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: category?.color ? `${category.color}18` : 'var(--color-primary-light)',
            color: category?.color || 'var(--color-primary)',
            border: `1px solid ${category?.color ? `${category.color}30` : 'rgba(99, 102, 241, 0.2)'}`,
            flexShrink: 0,
            boxShadow: category?.color ? `0 2px 10px ${category.color}15` : 'none',
          }}
        >
          <LucideIcon name={tool.icon} size={20} />
        </span>
        {category && (
          <span
            className="badge"
            style={{
              backgroundColor: `${category.color}15`,
              color: category.color,
              fontSize: '0.6875rem',
              border: `1px solid ${category.color}25`,
              fontWeight: 600,
            }}
          >
            {category.name.replace(' Tools', '').replace(' & ', '/')}
          </span>
        )}
      </div>

      <h3
        style={{
          fontSize: '0.975rem',
          fontWeight: 600,
          color: 'var(--color-fg)',
          marginBottom: '0.375rem',
          lineHeight: 1.3,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Link
          to={`/tools/${tool.slug}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {tool.name}
        </Link>
      </h3>

      <p
        style={{
          fontSize: '0.8125rem',
          color: 'var(--color-fg-muted)',
          lineHeight: 1.55,
          margin: 0,
          flex: 1,
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        {tool.description}
      </p>

      {onToggleFavorite && (
        <motion.button
          whileTap={{ scale: 0.85 }}
          className={`heart-btn ${isFavorite ? 'favorite' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(tool.id);
          }}
          aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            padding: '0.4rem',
            color: isFavorite ? '#ef4444' : 'var(--color-fg-faint)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
          }}
        >
          <Heart size={16} fill={isFavorite ? '#ef4444' : 'none'} />
        </motion.button>
      )}
    </motion.article>
  );
}
