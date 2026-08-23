import { Link } from 'react-router-dom';
import type { Category } from '../../types/tool';
import { LucideIcon } from './LucideIcon';
import { getToolCountByCategory } from '../../data/tools';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const toolCount = getToolCountByCategory(category.slug);

  return (
    <Link
      to={`/categories/${category.slug}`}
      className="card card-interactive"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.25rem',
        textDecoration: 'none',
        color: 'inherit',
      }}
      aria-label={`${category.name} — ${toolCount} tools`}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2.75rem',
          height: '2.75rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: `${category.color}15`,
          color: category.color,
          flexShrink: 0,
        }}
      >
        <LucideIcon name={category.icon} size={22} />
      </span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <h3
          style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--color-fg)',
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {category.name}
        </h3>
        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-fg-muted)',
            margin: '0.125rem 0 0',
            lineHeight: 1.4,
          }}
        >
          {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
        </p>
      </div>
      <span
        style={{
          color: 'var(--color-fg-faint)',
          fontSize: '1.25rem',
          flexShrink: 0,
        }}
      >
        →
      </span>
    </Link>
  );
}
