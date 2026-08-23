export default function About() {
  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>About Devora</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-fg-secondary)' }}>
        <p>
          Devora is a comprehensive suite of developer tools designed to make everyday development tasks faster, easier, and more secure.
        </p>
        
        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-fg)', marginTop: '1rem', marginBottom: '0.5rem' }}>Our Mission</h2>
        <p>
          Our mission is to provide developers with a single, reliable destination for all their utility needs. From formatting JSON and testing regular expressions to generating UUIDs and encoding data, Devora aims to streamline your workflow so you can focus on writing great code.
        </p>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-fg)', marginTop: '1rem', marginBottom: '0.5rem' }}>Core Principles</h2>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Speed:</strong> Tools should load instantly and perform calculations without lag.</li>
          <li><strong>Privacy:</strong> We believe your code and data are yours. All our tools process data locally in your browser—nothing is sent to our servers.</li>
          <li><strong>Simplicity:</strong> Interfaces should be clean, intuitive, and distraction-free.</li>
          <li><strong>Accessibility:</strong> Tools should be usable by everyone, regardless of device or ability.</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-fg)', marginTop: '1rem', marginBottom: '0.5rem' }}>Why "Devora"?</h2>
        <p>
          The name Devora embodies the concept of "devouring" work—helping developers consume and process tasks rapidly and efficiently.
        </p>
      </div>
    </div>
  );
}
