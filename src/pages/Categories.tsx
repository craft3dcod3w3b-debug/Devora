import { categories } from '../data/categories';
import CategoryCard from '../components/ui/CategoryCard';
import { SEO } from '../components/seo/SEO';

export default function Categories() {
  return (
    <div className="container section">
      <SEO 
        title="Tool Categories | Devora"
        description="Browse our comprehensive collection of developer tools organized by category."
        canonicalUrl="https://devora.dev/categories"
      />
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Categories</h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-fg-muted)', margin: 0 }}>
          Browse tools by their category.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}
