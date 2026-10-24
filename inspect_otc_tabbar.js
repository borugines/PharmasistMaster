const fs = require('fs');
const otc = fs.readFileSync('src/12_otc_guide.html', 'utf8');

const pTabBar = otc.indexOf('class="tab-bar"');
console.log(otc.substring(pTabBar, pTabBar + 600));

console.log('Snippet of otc end:');
console.log(otc.substring(otc.length - 400));
