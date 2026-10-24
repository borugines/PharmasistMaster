const fs = require('fs');
const path = require('path');

const printHubPath = path.join(__dirname, '..', '08_print_hub.html');
let p = fs.readFileSync(printHubPath, 'utf8');

p = p.replace(/全23大疾患/g, '全25大疾患');

const oldOpt = '<option value="c23">23. 褥瘡・創傷外用療法</option>';
const newOpts = oldOpt + `
            <option value="c24">24. 肺炎・呼吸器感染症</option>
            <option value="c25">25. 気管支喘息・咳喘息</option>`;

if (!p.includes('value="c24"')) {
  p = p.replace(oldOpt, newOpts);
  fs.writeFileSync(printHubPath, p, 'utf8');
  console.log("Successfully updated 08_print_hub.html to 25 diseases");
} else {
  console.log("Print hub already contains 25 diseases");
}
