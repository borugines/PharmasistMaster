const fs = require('fs');
const comp = fs.readFileSync('src/05_comparison.html', 'utf8');

const p4 = comp.indexOf('④ 精神神経疾患');
console.log('p4 in comparison:', p4);
if (p4 !== -1) {
  console.log(comp.substring(p4, p4 + 1500));
}
