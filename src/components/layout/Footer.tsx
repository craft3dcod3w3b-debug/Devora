import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu } from 'lucide-react';

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
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '250px',
          background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '2.5rem', position: 'relative' }}>
        {/* Top section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand column */}
          <div style={{ maxWidth: '320px' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'var(--color-footer-fg)',
                marginBottom: '1rem',
              }}
              aria-label="Devora — Home"
            >
              <img
                src="/devora-logo.png"
                alt="Devora logo"
                className="logo-footer"
              />
            </Link>
            <p
              style={{
                fontSize: '0.845rem',
                color: 'var(--color-footer-muted)',
                lineHeight: 1.6,
                margin: '0 0 1.25rem',
              }}
            >
              Developer tools, all in one place. Fast, precision client-side utilities designed for software engineers and creators.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: 'var(--color-footer-muted)',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
              <ShieldCheck size={13} style={{ color: '#10b981' }} />
              100% Client-Side Privacy
            </div>
          </div>

          {/* Tools Links */}
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--color-footer-fg)' }}>
              Tools
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {footerLinks.tools.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      fontSize: '0.845rem',
                      color: 'var(--color-footer-muted)',
                      textDecoration: 'none',
                      transition: 'all 150ms ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-primary)';
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-footer-muted)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--color-footer-fg)' }}>
              Categories
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {footerLinks.categories.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      fontSize: '0.845rem',
                      color: 'var(--color-footer-muted)',
                      textDecoration: 'none',
                      transition: 'all 150ms ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-primary)';
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-footer-muted)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--color-footer-fg)' }}>
              Legal & Info
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      fontSize: '0.845rem',
                      color: 'var(--color-footer-muted)',
                      textDecoration: 'none',
                      transition: 'all 150ms ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-primary)';
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-footer-muted)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
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
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.785rem', color: 'var(--color-footer-muted)', margin: 0 }}>
            © {new Date().getFullYear()} Devora. Built for developers, by developers.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.785rem', color: 'var(--color-footer-muted)' }}>
            <Cpu size={14} style={{ color: 'var(--color-primary)' }} />
            <span>Zero server latency • Client-side sandbox</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
