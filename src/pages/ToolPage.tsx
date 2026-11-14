import { Suspense, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Heart, ShieldCheck } from 'lucide-react';
import { getToolBySlug, getToolsByCategory } from '../data/tools';
import { getCategoryBySlug } from '../data/categories';
import { LucideIcon } from '../components/ui/LucideIcon';
import ToolCard from '../components/ui/ToolCard';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentTools } from '../hooks/useRecentTools';
import { SEO } from '../components/seo/SEO';
import { smoothEase, viewportScrollConfig } from '../utils/animations';

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addRecentTool } = useRecentTools();

  // Track recently used
  useEffect(() => {
    if (tool) {
      addRecentTool(tool.id);
    }
  }, [tool, addRecentTool]);

  if (!tool) {
    return <Navigate to="/404" replace />;
  }

  const category = getCategoryBySlug(tool.category);
  const relatedTools = getToolsByCategory(tool.category)
    .filter((t) => t.id !== tool.id)
    .slice(0, 4);

  const ToolComponent = tool.component;
  const canonicalUrl = `https://devora.dev/tools/${tool.slug}`;

  // JSON-LD Structured Data
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.seoDescription || tool.description,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://devora.dev/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Tools',
          item: 'https://devora.dev/tools',
        },
        ...(category
          ? [
              {
                '@type': 'ListItem',
                position: 3,
                name: category.name,
                item: `https://devora.dev/categories/${category.slug}`,
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: tool.name,
                item: canonicalUrl,
              },
            ]
          : [
              {
                '@type': 'ListItem',
                position: 3,
                name: tool.name,
                item: canonicalUrl,
              },
            ]),
      ],
    },
  ];

  return (
    <div className="container section">
      <SEO 
        title={tool.seoTitle} 
        description={tool.seoDescription || tool.description}
        canonicalUrl={canonicalUrl}
        jsonLd={jsonLd}
        type="website"
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
        <Link to="/tools" style={{ color: 'var(--color-fg-muted)', textDecoration: 'none' }}>
          Tools
        </Link>
        {category && (
          <>
            <ChevronRight size={13} />
            <Link
              to={`/categories/${category.slug}`}
              style={{ color: 'var(--color-fg-muted)', textDecoration: 'none' }}
            >
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight size={13} />
        <span style={{ color: 'var(--color-fg)', fontWeight: 500 }}>{tool.name}</span>
      </motion.nav>

      {/* Tool header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: smoothEase }}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1.25rem',
          marginBottom: '1.75rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3.25rem',
              height: '3.25rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: category?.color ? `${category.color}15` : 'var(--color-primary-light)',
              color: category?.color || 'var(--color-primary)',
              border: `1px solid ${category?.color ? `${category.color}30` : 'rgba(99, 102, 241, 0.25)'}`,
              boxShadow: category?.color ? `0 4px 16px ${category.color}15` : 'none',
              flexShrink: 0,
            }}
          >
            <LucideIcon name={tool.icon} size={24} />
          </span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>{tool.name}</h1>
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
                  {category.name.replace(' Tools', '')}
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-fg-muted)', margin: '0.35rem 0 0' }}>
              {tool.description}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Privacy badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
            }}
          >
            <ShieldCheck size={14} style={{ color: '#10b981' }} />
            <span>Local & Private</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleFavorite(tool.id)}
            className="btn btn-secondary btn-sm"
            style={{
              color: isFavorite(tool.id) ? '#ef4444' : undefined,
              borderColor: isFavorite(tool.id) ? 'rgba(239, 68, 68, 0.3)' : undefined,
            }}
          >
            <Heart size={15} fill={isFavorite(tool.id) ? '#ef4444' : 'none'} />
            {isFavorite(tool.id) ? 'Favorited' : 'Favorite'}
          </motion.button>
        </div>
      </motion.div>

      {/* Tool workbench component */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: smoothEase }}
        style={{ marginBottom: '2.5rem' }}
      >
        <Suspense
          fallback={
            <div
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '260px',
                color: 'var(--color-fg-muted)',
              }}
            >
              Loading utility workbench...
            </div>
          }
        >
          <ToolComponent />
        </Suspense>
      </motion.div>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportScrollConfig}
          transition={{ duration: 0.45, ease: smoothEase }}
          style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2.5rem' }}
        >
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
            Related Utilities
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {relatedTools.map((t) => (
              <ToolCard
                key={t.id}
                tool={t}
                isFavorite={isFavorite(t.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
