import { motion } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';
import { tools as allTools } from '../data/tools';
import ToolCard from '../components/ui/ToolCard';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { fadeInUp, staggerContainer, smoothEase } from '../utils/animations';

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
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: smoothEase }}
        style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}
      >
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
            Your Favorites
          </h1>
          <p style={{ fontSize: '0.975rem', color: 'var(--color-fg-muted)', margin: 0 }}>
            Tools you've pinned for quick access. Stored locally in your browser cache.
          </p>
        </div>
        {favoriteTools.length > 0 && (
          <button onClick={clearFavorites} className="btn btn-ghost btn-sm" style={{ color: 'var(--color-error)' }}>
            Clear all favorites
          </button>
        )}
      </motion.div>

      {favoriteTools.length > 0 ? (
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
          {favoriteTools.map((tool) => (
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
            textAlign: 'center',
            padding: '5rem 1.5rem',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              marginBottom: '1.25rem',
            }}
          >
            <Heart size={26} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No favorites saved yet</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-fg-muted)', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Click the heart icon on any tool card to pin your favorite utilities here for instant access anytime.
          </p>
          <Link to="/tools" className="btn btn-primary">
            Explore Tools <ArrowRight size={16} />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
