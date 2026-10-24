const fs = require('fs');
const comp = fs.readFileSync('src/05_comparison.html', 'utf8');

const idx = comp.indexOf('【頻出4領域の同効薬ガチンコ比較】');
if (idx !== -1) {
  console.log('Found! Snippet:');
  console.log(JSON.stringify(comp.substring(idx - 80, idx + 80)));
} else {
  console.log('Not found');
}
