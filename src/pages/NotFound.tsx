import { Link } from 'react-router-dom';
import { Home, Wrench } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1rem', lineHeight: 1 }}>
        404
      </div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h1>
      <p style={{ fontSize: '1.125rem', color: 'var(--color-fg-muted)', marginBottom: '2rem', maxWidth: '500px' }}>
        Looks like this tool or page doesn't exist. It might have been moved or the URL might be incorrect.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/tools" className="btn btn-primary">
          <Wrench size={18} />
          Browse Tools
        </Link>
        <Link to="/" className="btn btn-secondary">
          <Home size={18} />
          Go Home
        </Link>
      </div>
    </div>
  );
}
