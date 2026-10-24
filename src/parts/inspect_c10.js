const fs = require('fs');
const guide = fs.readFileSync('src/03_guide.html', 'utf8');

const start = guide.indexOf('id="c10"');
const end = guide.indexOf('id="c11"', start);

console.log(guide.substring(start, end));
