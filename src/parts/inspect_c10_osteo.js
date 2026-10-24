const fs = require('fs');
const guide = fs.readFileSync('src/03_guide.html', 'utf8');

const start = guide.indexOf('［骨粗鬆症（骨折リスク別）］');
if (start !== -1) {
  console.log(guide.substring(start - 100, start + 1200));
} else {
  console.log('Not found');
}
