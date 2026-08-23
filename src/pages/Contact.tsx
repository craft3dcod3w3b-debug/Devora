import { Mail, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>Contact Us</h1>
      <p style={{ fontSize: '1.125rem', color: 'var(--color-fg-muted)', marginBottom: '3rem' }}>
        Have questions, feedback, or a tool request? We'd love to hear from you.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: 'var(--radius-md)' }}>
              <Mail size={24} />
            </div>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Email Support</h2>
          </div>
          <p style={{ color: 'var(--color-fg-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            For general inquiries, bug reports, or partnership opportunities.
          </p>
          <a href="mailto:support@devora.tools" className="btn btn-primary" style={{ width: '100%' }}>
            support@devora.tools
          </a>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-secondary-light, rgba(124, 58, 237, 0.1))', color: 'var(--color-secondary)', borderRadius: 'var(--radius-md)' }}>
              <MessageSquare size={24} />
            </div>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Feature Requests</h2>
          </div>
          <p style={{ color: 'var(--color-fg-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Have an idea for a new tool? Let us know what you'd like to see next.
          </p>
          <a href="mailto:ideas@devora.tools" className="btn btn-secondary" style={{ width: '100%' }}>
            Submit an Idea
          </a>
        </div>

      </div>
    </div>
  );
}
