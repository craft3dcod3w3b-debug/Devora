import { motion } from 'framer-motion';
import { categories } from '../data/categories';
import CategoryCard from '../components/ui/CategoryCard';
import { SEO } from '../components/seo/SEO';
import { fadeInUp, staggerContainer, smoothEase } from '../utils/animations';

export default function Categories() {
  return (
    <div className="container section">
      <SEO 
        title="Tool Categories | Devora"
        description="Browse our comprehensive collection of developer tools organized by category."
        canonicalUrl="https://devora.dev/categories"
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: smoothEase }}
        style={{ marginBottom: '2.5rem' }}
      >
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          Categories
        </h1>
        <p style={{ fontSize: '0.975rem', color: 'var(--color-fg-muted)', margin: 0 }}>
          Explore utilities curated and organized across {categories.length} development disciplines.
        </p>
      </motion.div>

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
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={fadeInUp}>
            <CategoryCard category={cat} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
