export default function PrivacyPolicy() {
  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>Privacy Policy</h1>
      <p style={{ color: 'var(--color-fg-muted)', marginBottom: '2rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-fg-secondary)' }}>
        <p>
          At Devora, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your information when you use our website and tools.
        </p>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-fg)', marginTop: '1rem', marginBottom: '0.5rem' }}>1. Local Processing</h2>
        <p>
          The vast majority of Devora's tools operate entirely within your browser. This means that the data you input (such as JSON strings, code to format, text to hash) is processed locally on your device and is <strong>never transmitted to our servers</strong>.
        </p>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-fg)', marginTop: '1rem', marginBottom: '0.5rem' }}>2. Data We Collect</h2>
        <p>
          We do not require you to create an account to use Devora. We collect minimal information to ensure the proper functioning and improvement of our service:
        </p>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li><strong>Analytics Data:</strong> We may use privacy-friendly analytics to understand general usage patterns (e.g., which tools are most popular, page views). This data is anonymized and cannot be used to identify you personally.</li>
          <li><strong>Local Storage:</strong> We use your browser's Local Storage to save your preferences, such as theme choice (light/dark mode), favorite tools, and recently used tools. This data remains on your device.</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-fg)', marginTop: '1rem', marginBottom: '0.5rem' }}>3. Third-Party Services</h2>
        <p>
          We may partner with third-party advertising networks to display advertisements. These partners may use cookies or similar technologies to serve ads based on your browsing activities. Please refer to our Cookie Policy for more details.
        </p>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-fg)', marginTop: '1rem', marginBottom: '0.5rem' }}>4. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
        </p>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-fg)', marginTop: '1rem', marginBottom: '0.5rem' }}>5. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at privacy@devora.tools.
        </p>
      </div>
    </div>
  );
}
