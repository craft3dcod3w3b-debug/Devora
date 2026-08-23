import { getPopularTools } from '../data/tools';
import ToolCard from '../components/ui/ToolCard';
import { useFavorites } from '../hooks/useFavorites';
import { SEO } from '../components/seo/SEO';

export default function Popular() {
  const popularTools = getPopularTools();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="container section">
      <SEO 
        title="Popular Developer Tools | Devora"
        description="The most used and highest rated developer utilities on Devora."
        canonicalUrl="https://devora.dev/popular"
      />
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Popular Tools</h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-fg-muted)', margin: 0 }}>
          The most frequently used utilities by developers.
        </p>
      </div>

      {popularTools.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {popularTools.map((tool) => (
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
          <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No popular tools found.</p>
        </div>
      )}
    </div>
  );
}
