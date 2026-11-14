import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { getCategoryBySlug } from '../data/categories';
import { getToolsByCategory } from '../data/tools';
import ToolCard from '../components/ui/ToolCard';
import { useFavorites } from '../hooks/useFavorites';
import { LucideIcon } from '../components/ui/LucideIcon';
import { SEO } from '../components/seo/SEO';
import { fadeInUp, staggerContainer, smoothEase } from '../utils/animations';

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
      <motion.nav
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          fontSize: '0.8125rem',
          color: 'var(--color-fg-muted)',
          marginBottom: '1.75rem',
          flexWrap: 'wrap',
        }}
      >
        <Link to="/" style={{ color: 'var(--color-fg-muted)', textDecoration: 'none' }}>
          Home
        </Link>
        <ChevronRight size={13} />
        <Link to="/categories" style={{ color: 'var(--color-fg-muted)', textDecoration: 'none' }}>
          Categories
        </Link>
        <ChevronRight size={13} />
        <span style={{ color: 'var(--color-fg)', fontWeight: 500 }}>{category.name}</span>
      </motion.nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: smoothEase }}
        style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}
      >
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
            border: `1px solid ${category.color}30`,
            boxShadow: `0 4px 16px ${category.color}15`,
            flexShrink: 0,
          }}
        >
          <LucideIcon name={category.icon} size={28} />
        </span>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
              {category.name}
            </h1>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                color: category.color,
                backgroundColor: `${category.color}15`,
                border: `1px solid ${category.color}25`,
                padding: '0.2rem 0.65rem',
                borderRadius: 'var(--radius-full)',
              }}
            >
              {categoryTools.length} {categoryTools.length === 1 ? 'utility' : 'utilities'}
            </span>
          </div>
          <p style={{ fontSize: '0.975rem', color: 'var(--color-fg-muted)', margin: '0.35rem 0 0' }}>
            {category.description}
          </p>
        </div>
      </motion.div>

      {/* Tools Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {categoryTools.map((tool) => (
          <motion.div key={tool.id} variants={fadeInUp}>
            <ToolCard
              tool={tool}
              isFavorite={isFavorite(tool.id)}
              onToggleFavorite={toggleFavorite}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
