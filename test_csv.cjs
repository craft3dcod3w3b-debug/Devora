function parseCSV(text, delimiter) {
  const result = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  let currentLine = 1;
  let quoteStartLine = 1;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        cell += '"';
        i++; // skip next quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        cell += char;
        if (char === '\n') {
          currentLine++;
        }
      }
    } else {
      if (char === '"') {
        inQuotes = true;
        quoteStartLine = currentLine;
      } else if (char === delimiter) {
        row.push(cell);
        cell = '';
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        row.push(cell);
        result.push(row);
        row = [];
        cell = '';
        currentLine++;
        if (char === '\r') i++; // skip \n
      } else {
        cell += char;
      }
    }
  }

  if (inQuotes) {
    throw new Error(`Unclosed quoted field at line ${quoteStartLine}.`);
  }

  // Push last cell/row
  if (cell !== '' || row.length > 0) {
    row.push(cell);
    result.push(row);
  }

  return result;
}

function convert(input, delimiter = ',', hasHeader = true, minify = false) {
  if (!input.trim()) return '';
  
  try {
    let actualDelimiter = delimiter;
    if (delimiter === 'auto') {
      const firstLine = input.split('\n')[0] || '';
      const counts = { ',': 0, ';': 0, '\t': 0, '|': 0 };
      for (const c of firstLine) {
        if (c in counts) counts[c]++;
      }
      actualDelimiter = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      if (counts[actualDelimiter] === 0) actualDelimiter = ','; // default
    }

    const parsedRows = parseCSV(input, actualDelimiter);
    
    if (parsedRows.length === 0) {
      throw new Error('No valid CSV data found');
    }

    let finalJson;

    if (hasHeader) {
      const headers = parsedRows[0] || [];
      const dataRows = parsedRows.slice(1);
      finalJson = dataRows.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          let val = row[index] || '';
          if (val !== '' && !isNaN(Number(val))) {
            val = Number(val);
          } else if (typeof val === 'string') {
            if (val.toLowerCase() === 'true') {
              val = true;
            } else if (val.toLowerCase() === 'false') {
              val = false;
            }
          }
          obj[header.trim()] = val;
        });
        return obj;
      });
    } else {
      finalJson = parsedRows.map(row => 
        row.map(val => {
          if (val !== '' && !isNaN(Number(val))) return Number(val);
          if (typeof val === 'string') {
            if (val.toLowerCase() === 'true') return true;
            if (val.toLowerCase() === 'false') return false;
          }
          return val;
        })
      );
    }

    return JSON.stringify(finalJson, null, minify ? undefined : 2);
  } catch (err) {
    return 'Error: ' + err.message;
  }
}

const testCases = [
  {
    name: "Valid CSV",
    input: "name,age,active\nAli,15,true\nSara,16,false"
  },
  {
    name: "Empty Input",
    input: "   \n  "
  },
  {
    name: "Missing columns (fewer data cells than headers)",
    input: "id,name,age\n1,Ali"
  },
  {
    name: "Extra columns (more data cells than headers)",
    input: "id,name\n1,Ali,extra_data"
  },
  {
    name: "Malformed CSV (Unclosed quote)",
    input: 'id,name\n1,"Ali'
  },
  {
    name: "Quotes and Escaping",
    input: 'id,message\n1,"Hello, World"\n2,"She said ""Hi"""'
  },
  {
    name: "Data Type Conversion (Numbers & Booleans)",
    input: "id,score,passed,name\n001,95.5,true,Ali"
  }
];

testCases.forEach((tc) => {
  const actual = convert(tc.input);
  console.log(`\n--- ${tc.name} ---`);
  console.log(`Actual Output:\n${actual}`);
});
