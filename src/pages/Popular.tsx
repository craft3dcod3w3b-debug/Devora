import { motion } from 'framer-motion';
import { getPopularTools } from '../data/tools';
import ToolCard from '../components/ui/ToolCard';
import { useFavorites } from '../hooks/useFavorites';
import { SEO } from '../components/seo/SEO';
import { fadeInUp, staggerContainer, smoothEase } from '../utils/animations';

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
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: smoothEase }}
        style={{ marginBottom: '2.5rem' }}
      >
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          Popular Tools
        </h1>
        <p style={{ fontSize: '0.975rem', color: 'var(--color-fg-muted)', margin: 0 }}>
          The highest-demand utilities chosen by developers for daily engineering and debugging.
        </p>
      </motion.div>

      {popularTools.length > 0 ? (
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
          {popularTools.map((tool) => (
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
        <div
          className="card"
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
