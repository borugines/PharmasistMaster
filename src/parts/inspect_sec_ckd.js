const fs = require('fs');
const comp = fs.readFileSync('src/05_comparison.html', 'utf8');

const start = comp.indexOf('sec-ckd');
if (start !== -1) {
  const nextSec = comp.indexOf('sec-onc', start);
  console.log(comp.substring(start - 30, nextSec !== -1 ? nextSec : start + 3000));
} else {
  console.log('sec-ckd not found');
}
