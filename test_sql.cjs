const { format } = require('sql-formatter');

const validateSql = (sql) => {
  const cleanSql = sql
    .replace(/--.*$/gm, '') 
    .replace(/\/\*[\s\S]*?\*\//g, '') 
    .replace(/'(?:\\.|[^'\\])*'/g, '') 
    .replace(/"(?:\\.|[^"\\])*"/g, '') 
    .replace(/`(?:\\.|[^`\\])*`/g, ''); 

  let parens = 0;
  for (let i = 0; i < cleanSql.length; i++) {
    if (cleanSql[i] === '(') parens++;
    if (cleanSql[i] === ')') parens--;
    if (parens < 0) throw new Error('Unmatched closing parenthesis');
  }
  if (parens > 0) throw new Error('Unmatched opening parenthesis');

  if (cleanSql.match(/,\s*(FROM|WHERE|GROUP|HAVING|ORDER|LIMIT|OFFSET|INTO|VALUES|SET)\b/i)) {
    throw new Error('Trailing comma before keyword');
  }
  if (cleanSql.match(/,\s*(?:;|$)/)) {
    throw new Error('Trailing comma at end of query');
  }
  
  if (cleanSql.match(/,\s*,/)) {
    throw new Error('Multiple consecutive commas');
  }

  if (cleanSql.match(/\bSELECT\b(?![^;]*\bFROM\b)[^;]*\bWHERE\b/i)) {
    throw new Error('Missing FROM clause before WHERE');
  }

  const emptyClauseMatch = cleanSql.match(/\b(SELECT|FROM|WHERE|HAVING|ORDER\s+BY|GROUP\s+BY|JOIN|SET|INTO|VALUES)\s*(;|$|\b(?:FROM|WHERE|HAVING|ORDER\s+BY|GROUP\s+BY|JOIN|SET|LIMIT|OFFSET|INTO|VALUES|UNION|INTERSECT|EXCEPT)\b)/i);
  
  if (emptyClauseMatch) {
    throw new Error(`Empty clause detected: ${emptyClauseMatch[1]}`);
  }
};

const formatSqlText = (text) => {
  try {
    validateSql(text);
    return format(text, {
      language: 'sql',
      tabWidth: 2,
      keywordCase: 'upper',
      linesBetweenQueries: 2,
    });
  } catch (err) {
    return 'ERROR: ' + err.message;
  }
};

const tests = [
  {
    name: "Valid SQL",
    sql: "select id, name from users where age > 18;",
    expected: "SELECT\n  id,\n  name\nFROM\n  users\nWHERE\n  age > 18;"
  },
  {
    name: "Invalid SQL (Trailing comma before FROM)",
    sql: "SELECT a, b, FROM table",
    expected: "SELECT\n  a,\n  b,\nFROM\n  table"
  },
  {
    name: "Invalid SQL (Missing FROM)",
    sql: "SELECT a WHERE b = 1",
    expected: "SELECT\n  a\nWHERE\n  b = 1"
  },
  {
    name: "Invalid SQL (Unmatched Parenthesis)",
    sql: "SELECT * FROM t WHERE id IN (1, 2",
    expected: "SELECT\n  *\nFROM\n  t\nWHERE\n  id IN (1, 2"
  }
];

tests.forEach((t, i) => {
  const actual = formatSqlText(t.sql);
  
  // Also try formatting purely using sql-formatter to show what "focus only on formatting" means
  let pureFormatterOutput;
  try {
    pureFormatterOutput = format(t.sql, {
      language: 'sql',
      tabWidth: 2,
      keywordCase: 'upper',
      linesBetweenQueries: 2,
    });
  } catch(e) { pureFormatterOutput = "Pure formatting failed"; }

  const pass = (actual === t.expected);
  console.log(`\n--- Test ${i+1}: ${t.name} ---`);
  console.log(`RAW SQL:\n${t.sql}`);
  console.log(`\nEXPECTED FORMATTED OUTPUT:\n${t.expected}`);
  console.log(`\nACTUAL OUTPUT (with validation):\n${actual}`);
  console.log(`\nACTUAL OUTPUT (if validation was removed):\n${pureFormatterOutput}`);
  console.log(`\nRESULT: ${pass ? 'PASS' : 'FAIL'}`);
});
