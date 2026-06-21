# Qcard PRO Architecture

## 現在の構成

Frontend

* HTML
* CSS
* JavaScript

---

## Hosting

* Vercel

---

## Source Control

* GitHub

---

## Billing

* Stripe

---

## Authentication

* Supabase Auth

---

## Database

* Supabase

---

## Local Storage

* localStorage

---

## 音声機能

### TTS

Web Speech API

### 録音

MediaRecorder API

---

## データ分類

### ローカル保存

* カード
* シナリオ
* 設定

### 将来的なクラウド同期対象

* カード
* シナリオ
* 設定

### クラウド保存対象外

* 録音音声
* 一時キャッシュ

---

## スケーリング方針

Phase1

localStorage中心

Phase2

Supabase同期

Phase3

有料会員向け自動同期

Phase4

AI支援機能

---

## 非目標

以下は現時点で実施しない。

* React全面移行
* Next.js全面移行
* 独自サーバー運用
* 音声ファイル大量保存

---

## 開発原則

シンプルな構成を維持する。

ユーザー価値を伴わない技術的複雑化を避ける。

機能追加より安定性を優先する。
