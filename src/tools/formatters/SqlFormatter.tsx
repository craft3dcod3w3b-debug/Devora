import { useState } from 'react';
import { TwoPanelLayout } from '../../components/layout/ToolLayout';
import CodeEditor from '../../components/ui/CodeEditor';
import { format, SqlLanguage } from 'sql-formatter';
import Select from '../../components/ui/Select';

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Basic supported dialects for UI
  const [dialect, setDialect] = useState<SqlLanguage>('sql');



  const handleSqlError = () => {
    setOutput('');
    // Hide massive technical stack traces per user requirements
    setError('Unable to format SQL\n\nPlease check your query for syntax errors.');
  };

  const formatSqlText = (text: string, currentDialect: SqlLanguage) => {
    if (!text.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    
    try {
      const formatted = format(text, {
        language: currentDialect,
        tabWidth: 2,
        keywordCase: 'upper',
        linesBetweenQueries: 2,
      });
      setOutput(formatted);
      setError(null);
    } catch {
      setOutput('Error formatting SQL. Please check your syntax.');
    }
  };

  const minifySqlText = (text: string) => {
    if (!text.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const minified = text
        .replace(/--.*$/gm, '') // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/\s+/g, ' ') // Squash multiple spaces
        .trim();
      setOutput(minified);
      setError(null);
    } catch {
      handleSqlError();
    }
  };

  const handleDialectChange = (newDialect: SqlLanguage) => {
    setDialect(newDialect);
    if (input.trim()) {
      formatSqlText(input, newDialect);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Dialect:</label>
          <Select
            options={[
              { label: 'Standard SQL', value: 'sql' },
              { label: 'PostgreSQL', value: 'postgresql' },
              { label: 'MySQL', value: 'mysql' },
              { label: 'MariaDB', value: 'mariadb' },
              { label: 'SQLite', value: 'sqlite' },
              { label: 'Transact-SQL (SQL Server)', value: 'tsql' },
            ]}
            value={dialect}
            onChange={(val) => handleDialectChange(val as SqlLanguage)}
            style={{ width: '180px' }}
          />
        </div>

        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)', margin: '0 0.5rem' }}></div>

        <button
          onClick={() => formatSqlText(input, dialect)}
          className="btn btn-primary"
        >
          Format SQL
        </button>
        <button
          onClick={() => minifySqlText(input)}
          className="btn btn-ghost"
        >
          Minify SQL
        </button>

        {error && (
          <div style={{ color: 'var(--color-error)', fontSize: '0.875rem', whiteSpace: 'pre-wrap', width: '100%' }}>
            {error}
          </div>
        )}
      </div>

      <TwoPanelLayout>
        <div style={{ height: '100%', minHeight: '400px' }}>
          <CodeEditor
            value={input}
            onChange={setInput}
            title="Raw SQL Query"
            placeholder="SELECT * FROM table WHERE ugly = true..."
            language="SQL"
            wrap={true}
            minHeight="100%"
          />
        </div>

        <div style={{ height: '100%', minHeight: '400px' }}>
          <CodeEditor
            value={output}
            readOnly
            title="Formatted Output"
            language="SQL"
            wrap={false}
            minHeight="100%"
          />
        </div>
      </TwoPanelLayout>
    </div>
  );
}
