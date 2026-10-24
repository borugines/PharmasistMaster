const fs = require('fs');
const comp = fs.readFileSync('src/05_comparison.html', 'utf8');

const regex = /<div class="comp-section[^"]*" id="([^"]+)">[\s\S]*?<h2 class="comp-section-title">([\s\S]*?)<\/h2>/g;
let match;
while ((match = regex.exec(comp)) !== null) {
  const id = match[1];
  const title = match[2].replace(/<[^>]+>/g, '').trim();
  console.log(id, '->', title);
}

// Check tab buttons in 05_comparison.html
console.log('--- Tabs ---');
const tabMatches = comp.match(/<button class="comp-tab-btn[^"]*"[^>]*>[\s\S]*?<\/button>/g);
if (tabMatches) {
  tabMatches.forEach(t => console.log(t.trim()));
}
