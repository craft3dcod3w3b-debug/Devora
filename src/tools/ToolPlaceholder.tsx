export default function ToolPlaceholder() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      textAlign: 'center',
      minHeight: '300px',
      background: 'var(--color-bg-secondary)',
      borderRadius: 'var(--radius-lg)',
      border: '1px dashed var(--color-border-strong)',
    }}>
      <div style={{
        fontSize: '3rem',
        marginBottom: '1rem',
        opacity: 0.5,
      }}>
        🚧
      </div>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        color: 'var(--color-fg)',
        marginBottom: '0.5rem',
      }}>
        Coming Soon
      </h3>
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--color-fg-muted)',
        maxWidth: '400px',
        lineHeight: 1.6,
      }}>
        This tool is being built and will be available in an upcoming release. Stay tuned!
      </p>
    </div>
  );
}
