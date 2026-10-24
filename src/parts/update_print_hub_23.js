const fs = require('fs');
const path = require('path');

const printHubPath = path.join(__dirname, '..', '08_print_hub.html');
let p = fs.readFileSync(printHubPath, 'utf8');

p = p.replace(/全16大疾患/g, '全23大疾患');

const oldOpt = '<option value="c16">16. 皮膚科・アレルギー</option>';
const newOpts = oldOpt + `
            <option value="c17">17. 高尿酸血症・痛風</option>
            <option value="c18">18. 小児科頻出疾患</option>
            <option value="c19">19. 貧血（鉄欠乏/腎性）</option>
            <option value="c20">20. 睡眠障害・不眠症</option>
            <option value="c21">21. ピロリ除菌・胃腸炎</option>
            <option value="c22">22. 不妊治療（生殖補助）</option>
            <option value="c23">23. 褥瘡・創傷外用療法</option>`;

if (!p.includes('value="c17"')) {
  p = p.replace(oldOpt, newOpts);
  fs.writeFileSync(printHubPath, p, 'utf8');
  console.log("Successfully updated 08_print_hub.html to 23 diseases");
} else {
  console.log("Print hub already contains 23 diseases");
}
