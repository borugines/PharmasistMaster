const fs = require('fs');
const guide = fs.readFileSync('src/03_guide.html', 'utf8');

const regex = /<div class="card"[^>]*id="(c\d+)"[^>]*>[\s\S]*?<h2 class="card-title">([\s\S]*?)<\/h2>/g;
let m;
console.log('=== Current Guide Cards in 03_guide.html ===');
while ((m = regex.exec(guide)) !== null) {
  console.log(m[1], ':', m[2].replace(/<[^>]+>/g, '').trim());
}

// Check extra profiling or other files
const extra = fs.readFileSync('src/extra_profiling.html', 'utf8');
console.log('=== extra_profiling.html ===');
const extraMatches = extra.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g);
if (extraMatches) {
  extraMatches.forEach(em => console.log('  ', em.replace(/<[^>]+>/g, '').trim()));
}
