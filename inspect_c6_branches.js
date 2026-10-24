const fs = require('fs');
const g = fs.readFileSync('src/03_guide.html', 'utf8');

const p6 = g.indexOf('id="c6"');
const p7 = g.indexOf('id="c7"');
const c6 = g.substring(p6, p7);

const branches = [...c6.matchAll(/class="branch-cond-label">(.*?)<\/span>/g)].map(m => m[1]);
console.log('Branches in c6:', branches);

const headings = [...c6.matchAll(/<h[34][^>]*>(.*?)<\/h[34]>/g)].map(m => m[1].replace(/<[^>]+>/g, ''));
console.log('Headings in c6:', headings);
