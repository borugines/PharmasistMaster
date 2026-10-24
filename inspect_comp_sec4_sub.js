const fs = require('fs');
const comp = fs.readFileSync('src/05_comparison.html', 'utf8');

const p4 = comp.indexOf('④ 精神神経疾患');
const p5 = comp.indexOf('⑤ 免疫・アレルギー');

console.log('Snippet between sec 4 and sec 5:');
const sec4Content = comp.substring(p4, p5);
const subBanners = [...sec4Content.matchAll(/class="sub-banner[^"]*">([\s\S]*?)<\/div>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Sub banners in sec 4:', subBanners);
