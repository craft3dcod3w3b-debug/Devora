import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Wrench, LayoutGrid, TrendingUp, Info } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import ThemeToggle from '../ui/ThemeToggle';

const navLinks = [
  { to: '/tools', label: 'Tools', icon: Wrench },
  { to: '/categories', label: 'Categories', icon: LayoutGrid },
  { to: '/popular', label: 'Popular', icon: TrendingUp },
  { to: '/about', label: 'About', icon: Info },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Track scroll for shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 'var(--z-sticky)',
          backgroundColor: 'var(--color-navbar-bg)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${scrolled ? 'var(--color-navbar-border)' : 'transparent'}`,
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
          transition: 'border-color var(--transition-base), box-shadow var(--transition-base)',
        }}
      >
        <nav
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '4rem',
            gap: '1rem',
          }}
        >
          {/* Left — Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              textDecoration: 'none',
              color: 'var(--color-fg)',
              flexShrink: 0,
            }}
            aria-label="Devora — Home"
          >
            <img
              src="/devora-logo.png"
              alt="Devora logo"
              className="logo-nav"
            />
          </Link>

          {/* Center — Desktop Nav Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 0.875rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-navbar-fg-secondary)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-fast)',
                  backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right — Search + Theme Toggle + Mobile Menu */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexShrink: 0,
            }}
          >
            <Link
              to="/favorites"
              aria-label="Favorites"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-navbar-fg-secondary)',
                textDecoration: 'none',
                transition: 'background-color var(--transition-fast), color var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = 'var(--color-navbar-fg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-navbar-fg-secondary)';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </Link>

            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-navbar-fg-secondary)',
              }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '4rem',
            zIndex: 'var(--z-overlay)',
            backgroundColor: 'var(--color-bg)',
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            gap: '0.25rem',
            overflowY: 'auto',
          }}
        >
          {/* Mobile Search */}
          <div style={{ marginBottom: '1rem' }}>
            <SearchBar variant="hero" placeholder="Search tools..." />
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-fg)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                  transition: 'background var(--transition-fast)',
                })}
              >
                <Icon size={20} />
                {link.label}
              </NavLink>
            );
          })}

          <NavLink
            to="/favorites"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.875rem 1rem',
              fontSize: '1rem',
              fontWeight: 500,
              color: isActive ? 'var(--color-primary)' : 'var(--color-fg)',
              textDecoration: 'none',
              borderRadius: 'var(--radius-md)',
              backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
            })}
          >
            ❤️ Favorites
          </NavLink>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        .desktop-nav { display: flex !important; }
        .desktop-search { display: block !important; }
        .mobile-menu-btn { display: none !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-search { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
