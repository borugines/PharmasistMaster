const fs = require('fs');
const g = fs.readFileSync('src/03_guide.html', 'utf8');

const p6 = g.indexOf('id="c6"');
const p7 = g.indexOf('id="c7"');

console.log('c6 length:', p7 - p6);
console.log(g.substring(p6, p6 + 2000));
