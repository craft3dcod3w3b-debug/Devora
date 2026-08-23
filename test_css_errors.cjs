const cssTree = require('css-tree');

const testCases = [
  {
    name: 'Missing semicolon',
    css: `.container { padding: 20px margin: 0 auto; }`
  },
  {
    name: 'Missing closing brace',
    css: `.container { color: red; `
  },
  {
    name: 'Malformed declaration',
    css: `.container { color #fff; }`
  }
];

for (const tc of testCases) {
  try {
    console.log('---', tc.name, '---');
    cssTree.parse(tc.css, {
      positions: true,
      parseCustomProperty: true,
      onParseError: (err) => {
        throw err;
      }
    });
    console.log('NO ERROR');
  } catch (err) {
    console.log(err.message);
    if (err.sourceFragment) console.log(err.sourceFragment());
  }
}
