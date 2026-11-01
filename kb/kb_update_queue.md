# 知識ベース（KB）更新キュー（イベント駆動 ＋ 定期見直し管理）

このファイルは、**ガイドライン改訂・添付文書改訂（効能追加／禁忌変更）・新薬収載・審査情報提供事例の追加・再確認期限到来**によって見直しが必要になった仮説を管理するキューです。
`node tools/check_kb_freshness.js` を実行すると、影響を受ける薬剤と仮説が自動抽出されます。

## 現在のオープン項目

| キューID | トリガー種別 | 対象領域 / 出典 | 対象薬剤・仮説 | 優先度 | 状態 |
|---|---|---|---|---|---|
| `Q-2026-001` | 初期臨床確認（第1弾） | 循環器（`JCS_HF_2025`, `JSH_HTN_2019`, `JCS_ARR_2020`, `JCS_CAD_2022`, `JAS_DYSLIP_2022`） | 循環器コア薬剤（MRA, SGLT2i, β遮断薬, CCB, ARB/ARNI, ループ利尿薬, DOAC/ワルファリン, 抗血小板薬, 抗不整脈薬, スタチン/フィブラート） | ⭐⭐⭐ 最優先 | `in_review`（先生のレビュー待ち） |
| `Q-2026-002` | NSIPS実データ検証 | 入力アダプタ（`src/23_wizard_adapters.js`） | レセコンから出力したNSIPSテストデータ（ダミー／匿名化）を用いた列マッピング検証 | ⭐⭐ 高 | `waiting_sample` |
| `Q-2026-003` | 初期臨床確認（第2弾） | 糖尿病・内分泌・甲状腺（`JDS_DM_2024`, `JTA_THYROID_2023`） | レボチロキシン、DPP-4阻害薬、GLP-1受容体作動薬、ビグアナイド等 | ⭐⭐ 高 | `queued` |

## イベント登録の手順（ガイドライン改訂・新薬登場時）

1. `kb/source_registry.json` の該当ガイドラインの `needsRevalidation` を `true` にするか、`latestKnownEdition` を更新する
2. `node tools/check_kb_freshness.js` を実行する → 影響を受ける全仮説が一覧出力される
3. `node tools/make_review_sheet.js --source <SOURCE_ID>` で該当部分だけの差分レビュー表を生成し、確認後に `approved` へ更新する
