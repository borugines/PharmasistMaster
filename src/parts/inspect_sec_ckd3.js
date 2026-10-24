const fs = require('fs');
const comp = fs.readFileSync('src/05_comparison.html', 'utf8');

const start = comp.indexOf('<div class="comp-section sec-ckd">');
const end = comp.indexOf('<div class="comp-section sec-onc">', start);

console.log(comp.substring(start, end));
