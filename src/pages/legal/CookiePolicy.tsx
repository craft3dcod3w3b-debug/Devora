export default function CookiePolicy() {
  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>Cookie Policy</h1>
      <p style={{ color: 'var(--color-fg-muted)', marginBottom: '2rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-fg-secondary)' }}>
        <p>
          This Cookie Policy explains how Devora uses cookies and similar technologies to recognize you when you visit our website.
        </p>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-fg)', marginTop: '1rem', marginBottom: '0.5rem' }}>1. What are cookies?</h2>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information.
        </p>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-fg)', marginTop: '1rem', marginBottom: '0.5rem' }}>2. How do we use cookies and local storage?</h2>
        <p>
          At Devora, we primarily rely on your browser's <strong>Local Storage</strong> rather than traditional cookies to provide core functionality:
        </p>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li><strong>Preferences:</strong> We save your UI preferences, such as light/dark mode selection.</li>
          <li><strong>Favorites:</strong> We store the list of tools you have favorited.</li>
          <li><strong>Recent Activity:</strong> We keep track of the tools you have recently used to provide quick access.</li>
        </ul>
        <p>
          All of this data is stored locally on your device and is not sent to our servers.
        </p>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-fg)', marginTop: '1rem', marginBottom: '0.5rem' }}>3. Third-Party Cookies</h2>
        <p>
          In the future, Devora may use third-party services for analytics and advertising. These third parties may set cookies on your device to collect information about your browsing habits in order to serve relevant ads or provide aggregated usage statistics. We will update this policy if and when such services are integrated.
        </p>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-fg)', marginTop: '1rem', marginBottom: '0.5rem' }}>4. Your Choices</h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies or clear your local storage, you may still use our website, though your preferences (like dark mode and favorites) will be reset.
        </p>
      </div>
    </div>
  );
}
