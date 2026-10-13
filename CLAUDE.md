# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code 向けのガイドです。

## 概要

職務経歴書を JSON（`careerHistory.json`）で編集・プレビュー・印刷（PDF 出力）する Next.js 15（App Router）アプリ。サーバー側の処理はなく、データはすべてクライアント側の状態として持つ（DB も API もない）。

経歴データの元は兄弟リポジトリ `../phinesze-careers-data`（`npm run generate-career-history-json` で TS 定数から `careerHistory.json` を生成する）。

## コマンド

```bash
npm run dev       # 開発サーバー（Turbopack）http://localhost:3000
npm run build     # 本番ビルド（型チェックもここで走る）
npm run lint      # ESLint（next/core-web-vitals + typescript + prettier + better-tailwindcss）
npm run lint:fix
npm run format    # Prettier
```

テストフレームワークは導入されていない。Node は `.node-version`（20.19.5）を使う。

## アーキテクチャ

- **`src/app/layout.tsx`**: 全ページ共通で `PreviewMenuHeader` を表示する（ファイルを開く／保存、印刷、機密モード切替）。印刷時は `print:hidden` で隠れる。
- **`src/app/page.tsx`（`/`）**: RJSF（`@rjsf/mui`）による経歴データの編集フォーム。MUI テーマはスペースを詰めた設定（`spacing: 2`、small サイズ）。submit ボタンは空の fragment を渡して非表示にしている。
- **`src/app/preview/page.tsx`（`/preview`）**: `organisms/CareerHistoryView` で印刷用の表示をする。
- **状態**: `composables/useCareerHistoryState.ts` の jotai atom `careerHistoryAtom` に、編集画面とプレビューで同じデータを持つ。機密モードは URL クエリ `?is_secrets=1` から作る（`isSecrets`）。
- **ファイル入出力**: `composables/useCareerHistory.ts`。読み込み時に `CareerHistory.schema.json` に対して ajv8 でバリデーションする。保存は `showSaveFilePicker` を使い、非対応ブラウザでは `<a download>` にフォールバックする。
- **機密モード**: `isSecrets` が true のときは `company` / `secretDetail` を表示し、それ以外では `companyAlias` / `detail` を表示する。

### データモデル

- 型: `src/types/`（`CareerHistory` → `sections: (DocumentSection | ProjectGroupSection)[]`、`type` は `"document"` または `"project-groups"` で判別する）
- JSON Schema: `src/schemas/CareerHistory.schema.json`（draft-07、`definitions` + `$ref`）。型の JSDoc（`@title` など）と内容が対応しているが、生成スクリプトはないため、**型を変えたらスキーマも手で合わせること**。バリデーションとフォーム生成の両方がこのスキーマを使う。
- UI スキーマ: `src/schemas/careerHistoryUiSchema.ts`。`sections.items.anyOf` は**スキーマの anyOf と同じ順番**（[0] Document、[1] ProjectGroup）の配列で指定する。

### コンポーネント

- `components/atoms|molecules|organisms`: プレビュー表示用（Atomic Design）。Markdown は `atoms/MarkdownDocument.tsx`（markdown-it）で描画する。
- `components/rjsf/`: RJSF のカスタムテンプレート・フィールド。
  - `page.tsx` の `templates` でグローバルに登録しているもの: `ArrayFieldTemplate`、`ArrayFieldItemTemplate`、`ArrayFieldItemButtonsTemplate`（アイコンボタン、削除時は確認ダイアログ）、`KeyTitleWrapIfAdditionalTemplate`
  - UI スキーマで個別に指定するもの（`ui:ObjectFieldTemplate` / `ui:field`）: `CompanyRowObjectFieldTemplate`、`TwoObjectFieldTemplate`、`DataGridArrayField`（`@mui/x-data-grid`）

## 規約・注意点

- import は `@/*` → `src/*` のエイリアスを使う。
- スタイルは Tailwind CSS 4（`src/app/globals.css` がエントリ）と MUI（フォームのみ）を併用している。クラス結合には `utils/cn.ts`（clsx + tailwind-merge）を使う。Tailwind のクラス順は ESLint が警告する。
- 印刷レイアウトは `print:` / `not-print:` バリアントで制御している。
- `useSearchParams` を使うクライアントコンポーネントがあるため、`"use client"` の有無に注意する。
- コメント・UI 文言・コミットメッセージは日本語で書く。
- Claude Codeとのチャットでの返答も日本語で行う。
- README の「データ形式」例（`environments` が配列／タプル形式）は古い。現在の正しい形式はスキーマ（`{ category, environments: [{ name, version }] }`）を見ること。
