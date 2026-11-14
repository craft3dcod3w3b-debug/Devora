import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Wrench, LayoutGrid, TrendingUp, Info, Heart } from 'lucide-react';
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

  // Scroll progress for hairline indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 35,
    restDelta: 0.001,
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Track scroll for header elevation
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
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
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--color-navbar-border)',
          boxShadow: scrolled ? '0 4px 20px -2px rgba(0, 0, 0, 0.15)' : 'none',
          transition: 'all 250ms ease',
        }}
      >
        <nav
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '4.5rem',
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
              className="logo-nav logo-dark-only"
            />
            <img
              src="/devora-logo-light.png"
              alt="Devora logo"
              className="logo-nav logo-light-only"
            />
          </Link>

          {/* Center — Desktop Nav Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.25rem 0.375rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
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
                  padding: '0.45rem 0.95rem',
                  fontSize: '0.845rem',
                  fontWeight: 600,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-navbar-fg-secondary)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-full)',
                  transition: 'all 200ms ease',
                  backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right — Favorites + Theme Toggle + Mobile Menu Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
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
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-secondary)',
                textDecoration: 'none',
                transition: 'all 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
                e.currentTarget.style.color = '#ef4444';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                e.currentTarget.style.color = 'var(--color-navbar-fg-secondary)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <Heart size={17} />
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
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                color: 'var(--color-navbar-fg-secondary)',
                transition: 'all 200ms ease',
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Hairline Scroll Progress Bar */}
        <motion.div
          style={{
            scaleX,
            transformOrigin: '0%',
            height: '2px',
            background: 'linear-gradient(90deg, #6366f1, #a855f7, #06b6d4)',
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 300ms ease',
          }}
        />
      </header>

      {/* Animated Mobile menu drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              top: '4.25rem',
              zIndex: 'var(--z-overlay)',
              backgroundColor: 'var(--color-navbar-bg)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.25rem',
              gap: '0.5rem',
              overflowY: 'auto',
              borderBottom: '1px solid var(--color-navbar-border)',
            }}
          >
            {/* Mobile Search */}
            <div style={{ marginBottom: '1rem' }}>
              <SearchBar variant="hero" placeholder="Search developer tools..." />
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
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--color-primary)' : 'var(--color-fg)',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isActive ? 'var(--color-primary-light)' : 'var(--color-bg-secondary)',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(99, 102, 241, 0.3)' : 'var(--color-border)',
                    transition: 'all 150ms ease',
                  })}
                >
                  <Icon size={18} style={{ color: 'var(--color-primary)' }} />
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
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: isActive ? 'var(--color-primary)' : 'var(--color-fg)',
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--color-primary-light)' : 'var(--color-bg-secondary)',
                border: '1px solid',
                borderColor: isActive ? 'rgba(99, 102, 241, 0.3)' : 'var(--color-border)',
                transition: 'all 150ms ease',
              })}
            >
              <Heart size={18} style={{ color: '#ef4444' }} />
              Favorites
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>

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
