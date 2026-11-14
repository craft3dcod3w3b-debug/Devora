import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { tools as allTools, getToolsByCategory } from '../data/tools';
import { categories } from '../data/categories';
import ToolCard from '../components/ui/ToolCard';
import Select from '../components/ui/Select';
import { useFavorites } from '../hooks/useFavorites';
import { SEO } from '../components/seo/SEO';
import { fadeInUp, staggerContainer, smoothEase } from '../utils/animations';

export default function Tools() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredTools = useMemo(() => {
    let result = selectedCategory === 'all' ? allTools : getToolsByCategory(selectedCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.includes(q))
      );
    }
    return result;
  }, [search, selectedCategory]);

  return (
    <div className="container section">
      <SEO 
        title="All Developer Tools | Devora"
        description="Browse our complete collection of fast, free developer utilities."
        canonicalUrl="https://devora.dev/tools"
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: smoothEase }}
        style={{ marginBottom: '2.5rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
            All Tools
          </h1>
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-primary)',
              backgroundColor: 'var(--color-primary-light)',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
            }}
          >
            {filteredTools.length} {filteredTools.length === 1 ? 'utility' : 'utilities'}
          </span>
        </div>
        <p style={{ fontSize: '0.975rem', color: 'var(--color-fg-muted)', margin: 0 }}>
          Explore our complete collection of fast, private developer utilities running directly in your browser.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: smoothEase }}
        style={{
          display: 'flex',
          gap: '0.875rem',
          marginBottom: '2.25rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '420px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.875rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-fg-faint)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools by name, tag, or function..."
            className="input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        <Select
          options={[
            { label: 'All Categories', value: 'all' },
            ...categories.map((cat) => ({ label: cat.name, value: cat.slug })),
          ]}
          value={selectedCategory}
          onChange={setSelectedCategory}
          style={{ flex: '0 1 220px' }}
        />
      </motion.div>

      {/* Results */}
      {filteredTools.length > 0 ? (
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
          {filteredTools.map((tool) => (
            <motion.div key={tool.id} variants={fadeInUp}>
              <ToolCard
                tool={tool}
                isFavorite={isFavorite(tool.id)}
                onToggleFavorite={toggleFavorite}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-fg)', marginBottom: '0.5rem' }}>
            No tools found matching "{search}"
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-fg-muted)', marginBottom: '1.5rem' }}>
            Try searching with broader terms or clear your active category filter.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
            }}
            className="btn btn-secondary"
          >
            Reset Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
