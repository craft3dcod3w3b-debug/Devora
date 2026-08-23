const fs = require('fs');

const testCases = [
  {
    name: "Test case 1 — Invalid top-level object",
    input: `{\n  "name": "Ali",\n  "age": 15\n}`,
    expected: "Error: Input must be a JSON array of objects.",
  },
  {
    name: "Test case 2 — Valid input",
    input: `[\n  {"name": "Ali", "age": 15},\n  {"name": "Sara", "age": 16}\n]`,
    expected: "name,age\nAli,15\nSara,16",
  },
  {
    name: "Test case 3 — Invalid array item",
    input: `[\n  {"name": "Ali", "age": 15},\n  "Sara"\n]`,
    expected: "Error: Every item in the JSON array must be an object.",
  },
  {
    name: "Test case 4 — Invalid JSON",
    input: `[\n  {"name": "Ali", "age": 15},\n  {"name": "Sara", "age": 16\n]`,
    expected: "Error: Invalid JSON syntax.",
  }
];

function flattenObject(ob, prefix = false) {
  let toReturn = {};
  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if ((typeof ob[i]) === 'object' && ob[i] !== null && !Array.isArray(ob[i])) {
      let flatObject = flattenObject(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[prefix ? `${i}.${x}` : x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

const escapeCsv = (str, d) => {
  if (str.includes(d) || str.includes('"') || str.includes('\\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

const convertJsonToCsv = (input, delimiter = ',', flatten = true) => {
  try {
    let parsed;
    try {
      parsed = JSON.parse(input);
    } catch (e) {
      return 'Error: Invalid JSON syntax.';
    }

    if (!Array.isArray(parsed)) {
      throw new Error('Input must be a JSON array of objects.');
    }

    for (const item of parsed) {
      if (typeof item !== 'object' || item === null || Array.isArray(item)) {
        throw new Error('Every item in the JSON array must be an object.');
      }
    }

    if (parsed.length === 0) return '';

    const processedArray = flatten ? parsed.map((item) => flattenObject(item, true)) : parsed;
    
    const headers = new Set();
    processedArray.forEach((item) => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => headers.add(key));
      }
    });
    const headerArray = Array.from(headers);

    const rows = [];
    rows.push(headerArray.map(h => escapeCsv(h, delimiter)).join(delimiter));

    processedArray.forEach((item) => {
      const row = headerArray.map(header => {
        let val = item?.[header];
        if (val === null || val === undefined) return '';
        if (typeof val === 'object') val = JSON.stringify(val);
        return escapeCsv(String(val), delimiter);
      });
      rows.push(row.join(delimiter));
    });

    return rows.join('\\n');
  } catch (err) {
    return `Error: ${err.message}`;
  }
};

testCases.forEach((tc) => {
  const actual = convertJsonToCsv(tc.input);
  const passed = actual === tc.expected;
  
  console.log(`\n--- ${tc.name} ---`);
  console.log(`Expected:\n${tc.expected}`);
  console.log(`\nActual:\n${actual}`);
  console.log(`\nResult: ${passed ? 'PASS' : 'FAIL'}`);
});
