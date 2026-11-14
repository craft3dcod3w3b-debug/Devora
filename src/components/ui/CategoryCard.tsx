import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Category } from '../../types/tool';
import { LucideIcon } from './LucideIcon';
import { getToolCountByCategory } from '../../data/tools';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const toolCount = getToolCountByCategory(category.slug);

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{ height: '100%' }}
    >
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
          height: '100%',
        }}
        aria-label={`${category.name} — ${toolCount} tools`}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.875rem',
            height: '2.875rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: `${category.color}15`,
            color: category.color,
            border: `1px solid ${category.color}30`,
            boxShadow: `0 2px 10px ${category.color}15`,
            flexShrink: 0,
          }}
        >
          <LucideIcon name={category.icon} size={22} />
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <h3
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--color-fg)',
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {category.name}
            </h3>
            <span
              style={{
                fontSize: '0.725rem',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-fg-muted)',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                padding: '0.125rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {toolCount}
            </span>
          </div>
          <p
            style={{
              fontSize: '0.785rem',
              color: 'var(--color-fg-muted)',
              margin: '0.25rem 0 0',
              lineHeight: 1.4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {category.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
