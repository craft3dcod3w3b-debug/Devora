import { Suspense, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, Heart } from 'lucide-react';
import { getToolBySlug, getToolsByCategory } from '../data/tools';
import { getCategoryBySlug } from '../data/categories';
import { LucideIcon } from '../components/ui/LucideIcon';
import ToolCard from '../components/ui/ToolCard';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentTools } from '../hooks/useRecentTools';
import { SEO } from '../components/seo/SEO';
import { AdUnit } from '../components/ads/AdUnit';

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
        <Link to="/tools" style={{ color: 'var(--color-fg-muted)', textDecoration: 'none' }}>
          Tools
        </Link>
        {category && (
          <>
            <ChevronRight size={14} />
            <Link
              to={`/categories/${category.slug}`}
              style={{ color: 'var(--color-fg-muted)', textDecoration: 'none' }}
            >
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight size={14} />
        <span style={{ color: 'var(--color-fg)' }}>{tool.name}</span>
      </nav>

      {/* Tool header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3rem',
              height: '3rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: category?.color ? `${category.color}15` : 'var(--color-primary-light)',
              color: category?.color || 'var(--color-primary)',
            }}
          >
            <LucideIcon name={tool.icon} size={24} />
          </span>
          <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{tool.name}</h1>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-fg-muted)', margin: 0 }}>
              {tool.description}
            </p>
          </div>
        </div>
        <button
          onClick={() => toggleFavorite(tool.id)}
          className="btn btn-secondary btn-sm"
          style={{
            color: isFavorite(tool.id) ? '#ef4444' : undefined,
          }}
        >
          <Heart size={16} fill={isFavorite(tool.id) ? '#ef4444' : 'none'} />
          {isFavorite(tool.id) ? 'Favorited' : 'Favorite'}
        </button>
      </div>

      {/* Privacy badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          fontSize: '0.75rem',
          color: 'var(--color-success)',
          backgroundColor: 'var(--color-success-light)',
          padding: '0.25rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          marginBottom: '1.5rem',
        }}
      >
        🔒 Processed locally in your browser
      </div>

      {/* Tool component */}
      <div style={{ marginBottom: '2rem' }}>
        <Suspense
          fallback={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                color: 'var(--color-fg-muted)',
              }}
            >
              Loading tool...
            </div>
          }
        >
          <ToolComponent />
        </Suspense>
      </div>

      {/* Ad Placement */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
        <AdUnit type="rectangle" />
      </div>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Related Tools</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem',
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
        </div>
      )}
    </div>
  );
}
