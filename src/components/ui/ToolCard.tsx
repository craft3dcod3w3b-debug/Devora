import { Link } from 'react-router-dom';
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
    <div className="card card-interactive" style={{ position: 'relative', overflow: 'hidden' }}>
      <Link
        to={`/tools/${tool.slug}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1.25rem',
          textDecoration: 'none',
          color: 'inherit',
          height: '100%',
        }}
        aria-label={`Open ${tool.name}`}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem', paddingRight: '2rem' }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: category?.color ? `${category.color}15` : 'var(--color-primary-light)',
              color: category?.color || 'var(--color-primary)',
              flexShrink: 0,
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
              }}
            >
              {category.name.replace(' Tools', '').replace(' & ', '/')}
            </span>
          )}
        </div>
        <h3
          style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--color-fg)',
            marginBottom: '0.375rem',
            lineHeight: 1.3,
          }}
        >
          {tool.name}
        </h3>
        <p
          style={{
            fontSize: '0.8125rem',
            color: 'var(--color-fg-muted)',
            lineHeight: 1.5,
            margin: 0,
            flex: 1,
          }}
        >
          {tool.description}
        </p>
      </Link>
      {onToggleFavorite && (
        <button
          className={`heart-btn ${isFavorite ? 'favorite' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(tool.id);
          }}
          aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
        >
          <Heart size={16} fill={isFavorite ? '#ef4444' : 'none'} />
        </button>
      )}
    </div>
  );
}
