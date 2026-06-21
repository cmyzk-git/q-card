# CLAUDE.md

## Qcard PROについて

Qcard PROはカード型知識管理プラットフォームです。

単なる暗記カードアプリではありません。

知識の整理、朗読、面接練習、音声活用を支援するサービスです。

---

## 開発方針

最優先事項は既存機能の安定性です。

新機能追加よりも既存機能維持を優先してください。

勝手なリファクタリングは禁止です。

不要と思われるコードを削除しないでください。

---

## 実装前に必ず確認

以下を先に読んでください。

docs/ai/AI_RULES.md

docs/ai/AI_CONTEXT.md

docs/ai/ARCHITECTURE.md

docs/ai/FEATURE_MAP.md

docs/ai/TEST_CHECKLIST.md

---

## 実装前の回答フォーマット

コードを出力する前に必ず以下を提示してください。

①変更対象関数

②影響範囲

③副作用の可能性

④テスト対象

---

## 特に注意する機能

Qcard PROでは以下の機能が密結合しています。

* オーバーレイ
* 朗読モード
* Interviewモード
* 録音機能
* TTS

UI変更でもこれらへ影響する可能性があります。

---

## 禁止事項

関係ない箇所の変更

変数名変更

関数名変更

イベント構造変更

大規模リファクタリング

React化提案

Next.js化提案

---

## 技術構成

Frontend:
HTML
CSS
JavaScript

Hosting:
Vercel

Database:
Supabase

Billing:
Stripe

Source Control:
GitHub

---

## 目的

コードを美しくすることではありません。

ユーザー価値を安全に追加することです。
