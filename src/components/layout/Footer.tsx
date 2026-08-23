import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const footerLinks = {
  tools: [
    { label: 'All Tools', to: '/tools' },
    { label: 'Popular Tools', to: '/popular' },
    { label: 'JSON Tools', to: '/categories/json' },
    { label: 'Encoding Tools', to: '/categories/encoding' },
    { label: 'Generators', to: '/categories/generators' },
  ],
  categories: [
    { label: 'All Categories', to: '/categories' },
    { label: 'Text Tools', to: '/categories/text' },
    { label: 'Formatters', to: '/categories/formatters' },
    { label: 'Security', to: '/categories/security' },
    { label: 'Regex', to: '/categories/regex' },
  ],
  company: [
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Cookie Policy', to: '/cookie-policy' },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-footer-bg)',
        color: 'var(--color-footer-fg)',
        marginTop: 'auto',
      }}
    >
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
        {/* Top section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                color: 'var(--color-footer-fg)',
                marginBottom: '0.75rem',
              }}
            >
              <img
                src="/devora-logo.png"
                alt="Devora logo"
                className="logo-footer"
              />
            </Link>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--color-footer-muted)',
                lineHeight: 1.6,
                margin: '0 0 1rem',
                maxWidth: '260px',
              }}
            >
              Developer tools, all in one place. Fast, free, and private utilities for developers.
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontSize: '0.75rem',
                color: 'var(--color-footer-muted)',
              }}
            >
              <ShieldCheck size={14} />
              Processed locally in your browser
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-footer-fg)' }}>
              Tools
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {footerLinks.tools.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-footer-muted)',
                      textDecoration: 'none',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-footer-fg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-footer-muted)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-footer-fg)' }}>
              Categories
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {footerLinks.categories.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-footer-muted)',
                      textDecoration: 'none',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-footer-fg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-footer-muted)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-footer-fg)' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-footer-muted)',
                      textDecoration: 'none',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-footer-fg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-footer-muted)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <p style={{ fontSize: '0.75rem', color: 'var(--color-footer-muted)', margin: 0 }}>
            © {new Date().getFullYear()} Devora. All rights reserved.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-footer-muted)', margin: 0 }}>
            Built for developers, by developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
