import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getCategoryBySlug } from '../data/categories';
import { getToolsByCategory } from '../data/tools';
import ToolCard from '../components/ui/ToolCard';
import { useFavorites } from '../hooks/useFavorites';
import { LucideIcon } from '../components/ui/LucideIcon';
import { SEO } from '../components/seo/SEO';

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!category) {
    return <Navigate to="/404" replace />;
  }

  const categoryTools = getToolsByCategory(category.slug);

  return (
    <div className="container section">
      <SEO 
        title={`${category.name} Tools | Devora`}
        description={category.description}
        canonicalUrl={`https://devora.dev/categories/${category.slug}`}
      />
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          fontSize: '0.8125rem',
          color: 'var(--color-fg-muted)',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <Link to="/" style={{ color: 'var(--color-fg-muted)', textDecoration: 'none' }}>
          Home
        </Link>
        <ChevronRight size={14} />
        <Link to="/categories" style={{ color: 'var(--color-fg-muted)', textDecoration: 'none' }}>
          Categories
        </Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--color-fg)' }}>{category.name}</span>
      </nav>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: `${category.color}15`,
            color: category.color,
            flexShrink: 0,
          }}
        >
          <LucideIcon name={category.icon} size={28} />
        </span>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{category.name}</h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-fg-muted)', margin: 0 }}>
            {category.description} ({categoryTools.length} tools)
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      {categoryTools.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {categoryTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={isFavorite(tool.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            color: 'var(--color-fg-muted)',
          }}
        >
          <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No tools in this category yet.</p>
        </div>
      )}
    </div>
  );
}
