import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { ShieldCheck, Zap, Sparkles, Globe } from 'lucide-react';
import { fadeInUp, staggerContainer, smoothEase } from '../utils/animations';

export default function About() {
  return (
    <div className="container section" style={{ maxWidth: '820px' }}>
      <SEO 
        title="About Devora — Developer Tools Suite"
        description="Learn more about Devora, our mission, privacy principles, and client-side computing architecture."
        canonicalUrl="https://devora.dev/about"
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: smoothEase }}
        style={{ marginBottom: '2.5rem' }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
          About Devora
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-fg-muted)', margin: 0, lineHeight: 1.6 }}>
          A precision suite of client-side developer utilities designed to eliminate friction and respect developer privacy.
        </p>
      </motion.div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
      >
        <motion.div variants={fadeInUp} className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-fg)', marginTop: 0, marginBottom: '0.75rem' }}>
            Our Mission
          </h2>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--color-fg-secondary)', margin: 0 }}>
            Our mission is to provide developers worldwide with a single, dependable workbench for everyday utility needs.
            From formatting minified payloads and debugging JWT tokens to calculating subnet masks and generating cryptographically
            secure keys, Devora streamlines developer workflows without requiring account registrations, paywalls, or third-party tracking.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-fg)', marginTop: 0, marginBottom: '1.25rem' }}>
            Core Engineering Principles
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-primary)' }}>
                <Zap size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.25rem' }}>Sub-Millisecond Speed</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-fg-muted)', margin: 0, lineHeight: 1.5 }}>
                  Every algorithm executes locally in client memory with zero network latency.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.25rem' }}>Zero Telemetry Privacy</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-fg-muted)', margin: 0, lineHeight: 1.5 }}>
                  Your queries, secrets, and code never touch an external server or database.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(168, 85, 247, 0.1)', color: 'var(--color-secondary)' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.25rem' }}>Modern Ergonomics</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-fg-muted)', margin: 0, lineHeight: 1.5 }}>
                  Distraction-free, responsive dark/light interfaces crafted for software engineers.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>
                <Globe size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.25rem' }}>100% Free Forever</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-fg-muted)', margin: 0, lineHeight: 1.5 }}>
                  No feature gating, no credits, and no paywalls on core utilities.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
