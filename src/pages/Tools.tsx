import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { tools as allTools, getToolsByCategory } from '../data/tools';
import { categories } from '../data/categories';
import ToolCard from '../components/ui/ToolCard';
import Select from '../components/ui/Select';
import { useFavorites } from '../hooks/useFavorites';
import { SEO } from '../components/seo/SEO';

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
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>All Tools</h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-fg-muted)', margin: 0 }}>
          Browse all {allTools.length} developer tools available on Devora.
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '400px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.75rem',
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
            placeholder="Filter tools..."
            className="input"
            style={{ paddingLeft: '2.25rem' }}
          />
        </div>
        <Select
          options={[
            { label: 'All Categories', value: 'all' },
            ...categories.map((cat) => ({ label: cat.name, value: cat.slug })),
          ]}
          value={selectedCategory}
          onChange={setSelectedCategory}
          style={{ flex: '0 1 200px' }}
        />
      </div>

      {/* Results */}
      {filteredTools.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
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
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            color: 'var(--color-fg-muted)',
          }}
        >
          <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No tools found</p>
          <p style={{ fontSize: '0.875rem' }}>Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
