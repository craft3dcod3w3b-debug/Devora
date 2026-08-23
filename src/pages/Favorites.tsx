import { useFavorites } from '../hooks/useFavorites';
import { tools as allTools } from '../data/tools';
import ToolCard from '../components/ui/ToolCard';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { SEO } from '../components/seo/SEO';

export default function Favorites() {
  const { favorites, isFavorite, toggleFavorite, clearFavorites } = useFavorites();

  const favoriteTools = favorites
    .map((id) => allTools.find((t) => t.id === id))
    .filter(Boolean) as typeof allTools;

  return (
    <div className="container section">
      <SEO 
        title="Your Favorites | Devora"
        description="Access your saved developer tools."
        canonicalUrl="https://devora.dev/favorites"
      />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Your Favorites</h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-fg-muted)', margin: 0 }}>
            Tools you've saved for quick access. Stored locally in your browser.
          </p>
        </div>
        {favoriteTools.length > 0 && (
          <button onClick={clearFavorites} className="btn btn-ghost btn-sm" style={{ color: 'var(--color-error)' }}>
            Clear all
          </button>
        )}
      </div>

      {favoriteTools.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {favoriteTools.map((tool) => (
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
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--color-border-strong)',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'var(--color-bg)', marginBottom: '1.5rem', color: 'var(--color-fg-faint)', boxShadow: 'var(--shadow-sm)' }}>
            <Heart size={32} />
          </div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No favorites yet</h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-fg-muted)', marginBottom: '1.5rem', maxWidth: '400px', marginInline: 'auto' }}>
            Click the heart icon on any tool to save it here for quick access later.
          </p>
          <Link to="/tools" className="btn btn-primary">
            Browse Tools
          </Link>
        </div>
      )}
    </div>
  );
}
