const fs = require('fs');
const path = require('path');

const pComp = path.join(__dirname, '..', '05_comparison.html');
let compHtml = fs.readFileSync(pComp, 'utf8');

const targetOld = compHtml.match(/<td rowspan="3"><strong>オレキシン受容体拮抗薬（DORA）[\s\S]*?朝までぐっすり眠れるのに<strong>翌朝の持ち越し（眠気・だるさ）が最も出にくい<\/strong>よう設計された最新型。<\/td>\s*<\/tr>/);

if (targetOld) {
  const replacement = `<td rowspan="4"><strong>オレキシン受容体拮抗薬（DORA）</strong><br>【現在の第一選択】<br><span style="font-size:0.75rem; color:#475569;">※半減期の違いで使い分け</span></td>
          <td><strong>ボルズィ</strong>（ボルノレキサント）</td>
          <td><strong>入眠障害</strong>（キレ味最重視・超短時間型）</td>
          <td>極めて低い（非BZD離脱に最適）</td>
          <td><span class="char">半減期約2時間で最短！</span> Tmax約30分で素早く入眠させ、朝には完全に抜ける。「デエビゴ・ベルソムラ・クービビックでも翌朝に重さ・眠気が残る」「悪夢が出る」患者やマイスリーからの置換に最適。強力なCYP3A阻害薬併用禁忌。</td>
        </tr>
        <tr>
          <td><strong>クービビック</strong>（ダリドレキサント）</td>
          <td>入眠 ＆ 睡眠維持</td>
          <td>極めて低い</td>
          <td><span class="char">半減期が約8時間と絶妙！</span> 朝までぐっすり眠れるのに<strong>翌朝の持ち越し（眠気・だるさ）が最も出にくい</strong>よう設計されたバランス型。CYP3A4阻害薬併用禁忌。</td>
        </tr>
        <tr>
          <td><strong>デエビゴ</strong>（レンボレキサント）</td>
          <td><strong>入眠障害 ＆ 中途覚醒</strong>（万能型）</td>
          <td>極めて低い（筋弛緩なし）</td>
          <td><span class="char">現在の不眠症治療のトップランナー</span> 寝つきにも途中覚醒にもシャープに効く。半減期が長め（約50h）のため睡眠維持力最強だが、まれに<strong>「悪夢」「翌朝の持ち越し」</strong>の訴えあり。</td>
        </tr>
        <tr>
          <td><strong>ベルソムラ</strong>（スボレキサント）</td>
          <td><strong>中途覚醒・早朝覚醒</strong></td>
          <td>極めて低い</td>
          <td>夜中に何度も目が覚めるタイプに強い（半減期約10〜12h）。クラリスロマイシン等の<strong>CYP3A阻害薬と併用禁忌</strong>な点に注意。</td>
        </tr>`;

  compHtml = compHtml.replace(targetOld[0], replacement);
  fs.writeFileSync(pComp, compHtml, 'utf8');
  console.log('Successfully updated 05_comparison.html with Vorzye!');
} else {
  console.error('Could not find match in 05_comparison.html');
}
