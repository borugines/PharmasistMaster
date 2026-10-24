const fs = require('fs');
const guide = fs.readFileSync('src/03_guide.html', 'utf8');

const start = guide.indexOf('id="c12"');
const end = guide.indexOf('id="c13"', start);

console.log(guide.substring(start, end));
