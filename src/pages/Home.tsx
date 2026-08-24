import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Sparkles, Globe } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import ToolCard from '../components/ui/ToolCard';
import CategoryCard from '../components/ui/CategoryCard';
import { getPopularTools, getFeaturedTools } from '../data/tools';
import { categories } from '../data/categories';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentTools } from '../hooks/useRecentTools';
import { tools as allTools } from '../data/tools';
import { SEO } from '../components/seo/SEO';

const valueProps = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'All tools run instantly in your browser with no server roundtrips.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy First',
    description: 'Your data never leaves your browser. No uploads, no tracking.',
  },
  {
    icon: Sparkles,
    title: 'Always Free',
    description: 'Every tool is completely free to use. No account needed.',
  },
  {
    icon: Globe,
    title: 'Works Everywhere',
    description: 'Fully responsive across desktop, tablet, and mobile devices.',
  },
];

export default function Home() {
  const popularTools = getPopularTools();
  const featuredTools = getFeaturedTools();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { recentTools, clearRecentTools } = useRecentTools();

  const recentToolObjects = recentTools
    .map((entry) => allTools.find((t) => t.id === entry.toolId))
    .filter(Boolean) as typeof allTools;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Devora',
    url: 'https://devora.dev/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://devora.dev/tools?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <SEO 
        title="Devora — Developer Tools, All in One Place"
        description="Fast, free developer utilities for formatting, encoding, debugging, converting, generating, and working with data entirely in your browser."
        canonicalUrl="https://devora.dev/"
        jsonLd={jsonLd}
        type="website"
      />
      {/* ───── HERO ───── */}
      <section
        style={{
          position: 'relative',
          paddingTop: '5rem',
          paddingBottom: '5rem',
        }}
      >
        {/* Background decorations container (clipped) */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {/* Subtle grid pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(circle at 1px 1px, var(--color-border) 1px, transparent 0)',
              backgroundSize: '40px 40px',
              opacity: 0.4,
            }}
          />
          {/* Gradient glow */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '800px',
              height: '500px',
              background:
                'radial-gradient(ellipse, rgba(79, 70, 229, 0.08) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
            }}
          >
            Developer tools,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              all in one place.
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--color-fg-muted)',
              maxWidth: '640px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
            }}
          >
            Fast, free utilities for formatting, encoding, debugging, converting, generating,
            and working with data.
          </p>

          {/* Hero search */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <SearchBar variant="hero" placeholder="Search developer tools..." />
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <Link to="/tools" className="btn btn-primary btn-lg">
              Explore Tools
              <ArrowRight size={18} />
            </Link>
            <Link to="/popular" className="btn btn-secondary btn-lg">
              Popular Tools
            </Link>
          </div>

          {/* Features Highlight / Counter */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', color: 'var(--color-fg-muted)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} style={{ color: 'var(--color-primary)' }} />
              <span style={{ fontSize: '0.9375rem', fontWeight: 500 }}>
                <strong style={{ color: 'var(--color-fg)' }}>100% Client-Side</strong> & Private
              </span>
            </div>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-border-strong)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.9375rem', fontWeight: 500 }}>
              <span style={{ color: 'var(--color-success)' }}>●</span> {allTools.length} Tools Available
            </div>
          </div>
        </div>
      </section>

      {/* ───── POPULAR TOOLS ───── */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Popular Tools</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-fg-muted)', margin: 0 }}>
                The most used developer utilities
              </p>
            </div>
            <Link
              to="/popular"
              className="btn btn-ghost btn-sm"
              style={{ gap: '0.25rem' }}
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            {popularTools.slice(0, 8).map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={isFavorite(tool.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───── BROWSE CATEGORIES ───── */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Browse Categories</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-fg-muted)', margin: 0 }}>
              Find tools organized by category
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── FEATURED TOOLS ───── */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Featured Tools</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-fg-muted)', margin: 0 }}>
              Handpicked tools for everyday developer workflows
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            {featuredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={isFavorite(tool.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───── RECENTLY USED ───── */}
      {recentToolObjects.length > 0 && (
        <section className="section">
          <div className="container">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Recently Used</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-fg-muted)', margin: 0 }}>
                  Pick up where you left off
                </p>
              </div>
              <button 
                onClick={clearRecentTools} 
                className="btn btn-ghost btn-sm" 
                style={{ color: 'var(--color-error)' }}
              >
                Clear history
              </button>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem',
              }}
            >
              {recentToolObjects.slice(0, 6).map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isFavorite={isFavorite(tool.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── WHY DEVORA ───── */}
      <section
        className="section"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Why Devora?</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-fg-muted)', margin: 0, maxWidth: '480px', marginInline: 'auto' }}>
              Built for developers who value speed, privacy, and simplicity.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {valueProps.map((prop) => {
              const Icon = prop.icon;
              return (
                <div
                  key={prop.title}
                  className="card"
                  style={{
                    padding: '1.5rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '3rem',
                      height: '3rem',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      marginBottom: '1rem',
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                    {prop.title}
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-fg-muted)', margin: 0, lineHeight: 1.5 }}>
                    {prop.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── SEO CONTENT ───── */}
      <section className="section">
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
            The Developer Toolbox You've Been Looking For
          </h2>
          <div style={{ fontSize: '0.9375rem', color: 'var(--color-fg-secondary)', lineHeight: 1.8 }}>
            <p>
              Devora brings together essential developer utilities in one clean, fast interface.
              Whether you need to format JSON, encode Base64 strings, generate UUIDs, test regular
              expressions, or convert timestamps — every tool is just a click away.
            </p>
            <p style={{ marginTop: '1rem' }}>
              All processing happens locally in your browser. Your code and data never leave your
              device. No sign-ups, no accounts, no tracking — just the tools you need, when you
              need them.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
