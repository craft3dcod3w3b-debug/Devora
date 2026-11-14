import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, Sparkles, Globe, ChevronDown } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import ToolCard from '../components/ui/ToolCard';
import CategoryCard from '../components/ui/CategoryCard';
import { getPopularTools, getFeaturedTools, getToolsByCategory } from '../data/tools';
import { categories } from '../data/categories';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentTools } from '../hooks/useRecentTools';
import { tools as allTools } from '../data/tools';
import { SEO } from '../components/seo/SEO';
import { fadeInUp, staggerContainer, viewportScrollConfig, smoothEase } from '../utils/animations';

const valueProps = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'All tools run instantaneously in your browser with zero server roundtrips.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy First',
    description: 'Your data never leaves your computer. No backend uploads, no logs, no trackers.',
  },
  {
    icon: Sparkles,
    title: '100% Free & Open',
    description: 'Every single utility is completely free to use without requiring an account.',
  },
  {
    icon: Globe,
    title: 'Responsive & Modern',
    description: 'Engineered with precision for desktop, tablet, and mobile browsers.',
  },
];

const trendingTools = [
  { label: 'JSON Formatter', slug: 'json-formatter' },
  { label: 'JWT Decoder', slug: 'jwt-decoder' },
  { label: 'Base64 Encoder', slug: 'base64-encoder' },
  { label: 'Regex Tester', slug: 'regex-tester' },
  { label: 'UUID Generator', slug: 'uuid-generator' },
  { label: 'SQL Formatter', slug: 'sql-formatter' },
  { label: 'Cron Generator', slug: 'cron-expression-generator' },
  { label: 'Color Picker', slug: 'color-picker' },
];

export default function Home() {
  const popularTools = getPopularTools();
  const featuredTools = getFeaturedTools();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { recentTools, clearRecentTools } = useRecentTools();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const recentToolObjects = recentTools
    .map((entry) => allTools.find((t) => t.id === entry.toolId))
    .filter(Boolean) as typeof allTools;

  const filteredTools = selectedCategory === 'all'
    ? popularTools.slice(0, 12)
    : getToolsByCategory(selectedCategory).slice(0, 12);

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

      {/* ───── HERO SECTION ───── */}
      <section
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 4.5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '3rem',
          paddingBottom: '2.5rem',
          zIndex: 30,
          overflow: 'visible',
        }}
      >
        {/* Background ambient lighting (isolated overflow clipping) */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          {/* Dotted grid pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.08) 1px, transparent 0)',
              backgroundSize: '36px 36px',
              opacity: 0.6,
            }}
          />
          {/* Ambient radial glow */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '900px',
              height: '520px',
              background:
                'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.16) 0%, rgba(168, 85, 247, 0.08) 45%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
        </div>

        <div className="container" style={{ position: 'relative', textAlign: 'center', zIndex: 1, margin: 'auto' }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Privacy Highlight Badge */}
            <motion.div
              variants={fadeInUp}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                marginBottom: '1.75rem',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', boxShadow: '0 0 10px #10b981' }} />
              <ShieldCheck size={14} style={{ color: 'var(--color-primary)' }} />
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-fg)' }}>
                100% Client-Side & Private
              </span>
              <span style={{ color: 'var(--color-border-strong)' }}>•</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-fg-muted)' }}>
                {allTools.length} Tools Available
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              style={{
                fontSize: 'clamp(2.35rem, 5.5vw, 4.25rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
                maxWidth: '840px',
              }}
            >
              Developer tools,{' '}
              <span className="gradient-text">
                all in one place.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                color: 'var(--color-fg-muted)',
                maxWidth: '640px',
                margin: '0 auto 2.25rem',
                lineHeight: 1.6,
              }}
            >
              Fast, privacy-first developer utilities for formatting, encoding, debugging,
              converting, generating, and inspecting data in real time.
            </motion.p>

            {/* Hero Search Bar */}
            <motion.div
              variants={fadeInUp}
              style={{ width: '100%', maxWidth: '600px', marginBottom: '1.75rem', position: 'relative', zIndex: 100 }}
            >
              <SearchBar variant="hero" placeholder="Search developer tools (e.g. JSON, Regex, JWT, Base64)..." />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={fadeInUp}
              style={{ display: 'flex', justifyContent: 'center', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '2rem' }}
            >
              <Link to="/tools" className="btn btn-primary btn-lg">
                Explore All Tools
                <ArrowRight size={18} />
              </Link>
              <Link to="/popular" className="btn btn-secondary btn-lg">
                Popular Tools
              </Link>
            </motion.div>

            {/* Trending Quick Shortcut Chips */}
            <motion.div
              variants={fadeInUp}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: '720px',
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--color-fg-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Trending:
              </span>
              {trendingTools.map((tool) => (
                <Link
                  key={tool.slug}
                  to={`/tools/${tool.slug}`}
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-fg-secondary)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    textDecoration: 'none',
                    transition: 'all 150ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-primary)';
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-fg-secondary)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                  }}
                >
                  {tool.label}
                </Link>
              ))}
            </motion.div>

            {/* Feature / Capability Highlights Strip — Fills the hero view purposefully */}
            <motion.div
              variants={fadeInUp}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
                width: '100%',
                maxWidth: '920px',
                marginTop: '2.5rem',
              }}
            >
              <div
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(99, 102, 241, 0.12)',
                    color: 'var(--color-primary)',
                    flexShrink: 0,
                  }}
                >
                  <Zap size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-fg)' }}>
                    Sub-Millisecond Speed
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)' }}>
                    0ms server latency, instant in-memory processing
                  </div>
                </div>
              </div>

              <div
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    color: '#10b981',
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-fg)' }}>
                    Air-Gapped Privacy
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)' }}>
                    Zero network logs. Data stays in your browser
                  </div>
                </div>
              </div>

              <div
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(168, 85, 247, 0.12)',
                    color: '#a855f7',
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-fg)' }}>
                    {allTools.length} Modern Utilities
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)' }}>
                    Format, encode, debug, generate & inspect
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Down Prompt Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            marginTop: '2rem',
            paddingBottom: '0.5rem',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <a
            href="#explore-section"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'var(--color-fg-muted)',
              fontSize: '0.785rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 150ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-fg-muted)')}
          >
            <span>Explore Utilities</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* ───── POPULAR & EXPLORE SECTION ───── */}
      <section
        id="explore-section"
        className="section"
        style={{
          padding: '5rem 0',
          backgroundColor: 'var(--color-bg-secondary)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportScrollConfig}
            transition={{ duration: 0.5, ease: smoothEase }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.75rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', letterSpacing: '-0.025em' }}>Explore Utilities</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-fg-muted)', margin: 0 }}>
                High-performance utilities built for daily developer workflows
              </p>
            </div>

            <Link
              to="/tools"
              className="btn btn-ghost btn-sm"
              style={{ gap: '0.375rem', color: 'var(--color-primary)' }}
            >
              View all {allTools.length} tools <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Interactive Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportScrollConfig}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
              marginBottom: '2rem',
              scrollbarWidth: 'none',
            }}
          >
            <button
              onClick={() => setSelectedCategory('all')}
              className={`btn btn-sm ${selectedCategory === 'all' ? 'btn-primary' : 'btn-ghost'}`}
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '0.45rem 1rem',
                fontSize: '0.8125rem',
                backgroundColor: selectedCategory === 'all' ? 'var(--color-primary)' : 'var(--color-card)',
                border: `1px solid ${selectedCategory === 'all' ? 'var(--color-primary)' : 'var(--color-border)'}`,
              }}
            >
              All Popular
            </button>
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`btn btn-sm ${selectedCategory === cat.slug ? 'btn-primary' : 'btn-ghost'}`}
                style={{
                  borderRadius: 'var(--radius-full)',
                  padding: '0.45rem 1rem',
                  fontSize: '0.8125rem',
                  whiteSpace: 'nowrap',
                  backgroundColor: selectedCategory === cat.slug ? 'var(--color-primary)' : 'var(--color-card)',
                  border: `1px solid ${selectedCategory === cat.slug ? 'var(--color-primary)' : 'var(--color-border)'}`,
                }}
              >
                {cat.name.replace(' Tools', '')}
              </button>
            ))}
          </motion.div>

          {/* Tools Grid — 12 Tools */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportScrollConfig}
            transition={{ duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={isFavorite(tool.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── BROWSE CATEGORIES ───── */}
      <section
        className="section"
        style={{
          padding: '5rem 0',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportScrollConfig}
            transition={{ duration: 0.5, ease: smoothEase }}
            style={{ marginBottom: '2.5rem' }}
          >
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', letterSpacing: '-0.025em' }}>Browse by Category</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-fg-muted)', margin: 0 }}>
              Quickly find utilities grouped by development discipline
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportScrollConfig}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {categories.map((cat) => (
              <motion.div key={cat.id} variants={fadeInUp}>
                <CategoryCard category={cat} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── FEATURED TOOLS ───── */}
      <section
        className="section"
        style={{
          padding: '5rem 0',
          backgroundColor: 'var(--color-bg-secondary)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportScrollConfig}
            transition={{ duration: 0.5, ease: smoothEase }}
            style={{ marginBottom: '2.5rem' }}
          >
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', letterSpacing: '-0.025em' }}>Featured Workbenches</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-fg-muted)', margin: 0 }}>
              Handpicked tools for high-efficiency code editing, formatting, and debugging
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
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

      {/* ───── RECENTLY USED (IF PRESENT) ───── */}
      {recentToolObjects.length > 0 && (
        <section className="section" style={{ padding: '4rem 0', position: 'relative', zIndex: 1 }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportScrollConfig}
              transition={{ duration: 0.5, ease: smoothEase }}
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
                <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', letterSpacing: '-0.025em' }}>Recently Used</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-fg-muted)', margin: 0 }}>
                  Pick up right where you left off
                </p>
              </div>
              <button 
                onClick={clearRecentTools} 
                className="btn btn-ghost btn-sm" 
                style={{ color: 'var(--color-error)' }}
              >
                Clear history
              </button>
            </motion.div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.25rem',
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
        style={{
          padding: '5.5rem 0',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportScrollConfig}
            transition={{ duration: 0.5, ease: smoothEase }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>Why Developers Choose Devora</h2>
            <p style={{ fontSize: '0.975rem', color: 'var(--color-fg-muted)', margin: 0, maxWidth: '540px', marginInline: 'auto' }}>
              Designed from the ground up to respect your privacy, eliminate wait times, and provide precision tools.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportScrollConfig}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {valueProps.map((prop) => {
              const Icon = prop.icon;
              return (
                <motion.div
                  key={prop.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="card"
                  style={{
                    padding: '2rem',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '3.5rem',
                      height: '3.5rem',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'rgba(99, 102, 241, 0.12)',
                      color: 'var(--color-primary)',
                      border: '1px solid rgba(99, 102, 241, 0.25)',
                      marginBottom: '1.25rem',
                      boxShadow: '0 4px 14px rgba(99, 102, 241, 0.12)',
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-fg)' }}>
                    {prop.title}
                  </h3>
                  <p style={{ fontSize: '0.845rem', color: 'var(--color-fg-muted)', margin: 0, lineHeight: 1.6 }}>
                    {prop.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ───── SEO CONTENT SECTION ───── */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', padding: '4rem 0', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportScrollConfig}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="card"
            style={{ padding: '2.5rem' }}
          >
            <h2 style={{ fontSize: '1.45rem', marginBottom: '1.25rem', textAlign: 'center', letterSpacing: '-0.02em' }}>
              The Modern Developer Toolkit
            </h2>
            <div style={{ fontSize: '0.9375rem', color: 'var(--color-fg-secondary)', lineHeight: 1.8 }}>
              <p style={{ margin: 0 }}>
                Devora unifies essential everyday utilities into one lightning-fast, zero-friction interface.
                Whether you need to validate JSON schemas, decode base64 payloads, format nested SQL, calculate CIDR subnet ranges,
                or generate cryptographic hashes — every utility runs entirely within your browser sandbox.
              </p>
              <p style={{ marginTop: '1.25rem', marginInline: 0, marginBottom: 0 }}>
                We do not upload your sensitive code, tokens, or queries to any server. No accounts, no paywalls,
                and no telemetry tracking — pure client-side computing designed by developers, for developers.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
