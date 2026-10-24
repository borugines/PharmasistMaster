const fs = require('fs');
const app = fs.readFileSync('src/09_app.js', 'utf8');

const drugs = ['プラリア', 'デノタス', 'イベニティ', 'オスタバロ', 'ボナロン', 'エディロール', 'ビビアント'];
drugs.forEach(d => {
  console.log(d, 'in app.js?', app.includes(d));
});
