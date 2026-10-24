const fs = require('fs');
const guide = fs.readFileSync('src/03_guide.html', 'utf8');

// Check guide navigation at the beginning
const navMatch = guide.match(/<ul class="guide-nav-list">[\s\S]*?<\/ul>/);
if (navMatch) {
  console.log('--- Guide nav snippet ---');
  console.log(navMatch[0].slice(-500));
}

// Check end of cards in 03_guide.html
const lastCard = guide.match(/<div class="card" id="c26"[\s\S]*$/);
if (lastCard) {
  console.log('--- c26 end snippet ---');
  console.log(lastCard[0].slice(-300));
}
