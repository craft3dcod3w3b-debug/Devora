const bcrypt = require('bcryptjs');
const hash = "$2b$10$umxqqewXWdfp.F4MwcynG.lHAyu6CBhG9vF.GsCkQL.7Lxyz3ebc.";
const pass = "TestPassword123!";

try {
  console.log("Match:", bcrypt.compareSync(pass, hash));
} catch (e) {
  console.log("Error:", e.message);
}
