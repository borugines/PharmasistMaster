# 疾患特定システム 知識ベース変更履歴（KB_CHANGELOG）

## KB Version `2026.11.1` (2026-11-02)

### 1. Phase 0: 既存データの整合性完全修復・水増し撤廃
- **未定義疾患ID参照 5件の解決**:
  - `prednisolone`: `pmr`（リウマチ性多発筋痛症）を新規疾患カードとして正式追加
  - `fibrate`: `pbc_cholestasis`（原発性胆汁性胆管炎に対するUDCA＋ベザフィブラート適応外・GL推奨療法）を正式追加
  - `retina_adaptinol`: `adaptinol_low_vision_care`（進行期網膜色素変性症の求心性視野狭窄・遮光眼鏡連携）を正式追加、および `adaptinol_photoprotection_alert` の誤コピー指導文を修正
- **未参照疾患 1件の解決**:
  - `oral_candidiasis_xerostomia`: `oc_opt_itrizole_solution` の重み付け参照先を `oral_candidiasis_itraconazole_solution` に修正
- **標準スキーマ欠落 5薬剤の正規化**:
  - `cabpirin_takeruda`, `dry_mouth_salagen`, `anabolic_primobolan`, `tki_votrient`, `retina_adaptinol` の全疾患に `baseProb`, `subType`, `criteria`, `reason`, `keyPoint` を補完
- **確信度の進捗水増し廃止**:
  - `updateAkinatorGauge()` から `baseConf = 25 + progressRatio * 45` を完全撤廃し、ベイズ事後確率そのものを表示する方式へ移行

### 2. Phase 1 & 2: アキネーター型ベイズ推論エンジン・重複エイリアス統合・循環器第1弾強化
- **重複エイリアス 30件の統合**: 同一薬剤名・症状名が複数エントリに跨っていた30グループを統合し、候補仮説の和集合でベイズ推論を実行する構造へ刷新
- **エビデンス階層（A/B/C）× 処方頻度（common/occasional/rare）による事前確率モデル**:
  - 適応外（🟠 `offlabel`）・低エビデンス（`C`）の仮説も回答で否定されない限り除外せず保持し、支持回答が集まれば第1位（特定）へ浮上する設計を実装
- **期待情報利得 ÷ 質問コスト（$\mathrm{IG}(q)/\mathrm{cost}(q)$）による動的1問1答アルゴリズム**を `src/22_wizard_engine.js` に実装
- **NSIPS（実データ駆動パーサー）・JAHIS処方箋QR・多剤手入力アダプタ**を `src/23_wizard_adapters.js` に実装
- **循環器領域（第1弾）の併用シグネチャ24件**を `src/24_wizard_signatures.js` に実装
