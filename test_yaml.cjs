const YAML = require('yaml');

const testCases = [
  {
    name: "1. Incorrect Indentation (Fatal syntax error)",
    input: `server:\nport: 8080\n  host: localhost`
  },
  {
    name: "2. Tab characters instead of spaces",
    input: `server:\n\tport: 8080`
  },
  {
    name: "3. Duplicate Keys",
    input: `name: John\nname: Doe\nage: 30`
  },
  {
    name: "4. Unquoted strings with special characters",
    input: `path: /usr/local/bin:/*\npattern: *.txt`
  },
  {
    name: "5. Malformed Arrays (missing hyphen)",
    input: `fruits:\n  - apple\n  orange\n  - banana`
  }
];

testCases.forEach((tc) => {
  console.log(`\n--- ${tc.name} ---`);
  console.log(`Input:\n${tc.input}\n`);
  try {
    const parsed = YAML.parse(tc.input);
    console.log(`Output:\n${JSON.stringify(parsed, null, 2)}`);
  } catch (e) {
    console.log(`Output:\nError: ${e.message}`);
  }
});
