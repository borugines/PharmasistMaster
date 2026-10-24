const fs = require('fs');
const comp = fs.readFileSync('src/05_comparison.html', 'utf8');

const regex = /<div class="comp-section [^"]*sec-ckd[^"]*">([\s\S]*?)<\/div>\s*<div class="comp-section/g;
const m = regex.exec(comp);
if (m) {
  console.log(m[0].substring(0, 1500));
} else {
  // Let's see what comp-sections exist
  const allSecs = comp.match(/<div class="comp-section [^"]*">/g);
  console.log('allSecs:', allSecs);
}
