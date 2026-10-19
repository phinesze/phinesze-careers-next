# phinesze-careers-next

職務経歴書をJSONデータ（`careerHistory.json`）で編集・プレビュー・印刷（PDF出力）するためのNext.jsアプリです。

## 必要環境

- Node.js 20.19.5（`.node-version`参照）
- npm

## セットアップ

```bash
npm install
```

## 開発サーバー起動

<http://localhost:3000>でサーバーが起動します。

```bash
npm run dev
```

## 使い方

1. ヘッダーの「ファイル」→「開く」で経歴データのJSONを読み込む（[src/schemas/CareerHistory.schema.json](src/schemas/CareerHistory.schema.json)でバリデーションされる）
   - サンプルデータ: [public/sample/careerHistory.sample.json](public/sample/careerHistory.sample.json)
2. トップページ（`/`）の「編集」ペインのフォームで内容を編集する。「プレビュー」ペインに結果がすぐ反映される
3. 「ファイル」→「保存」でJSONを保存する（File System Access API非対応のブラウザではダウンロードになる）
4. 「経歴書を印刷」ボタンで印刷・PDF保存する（プレビューのみの表示に切り替えてから印刷ダイアログを開く。ヘッダーは印刷時に非表示）

### 表示メニュー

| 項目                           | 説明                                                          |
| ------------------------------ | ------------------------------------------------------------- |
| 編集                           | 編集フォームの表示／非表示                                    |
| プレビュー                     | プレビューの表示／非表示（編集と両方表示すると左右分割表示）  |
| プレビューを機密要素ありにする | 機密モードの切り替え（URLクエリ`is_secrets=1`を付け外しする） |

### URLクエリパラメーター

| パラメーター   | 説明                                                                      |
| -------------- | ------------------------------------------------------------------------- |
| `is_secrets=1` | 機密モード。会社の実名（`company`）や機密情報（`secretDetail`）を表示する |

例: `http://localhost:3000/?is_secrets=1`

プレビューのみのページ`/preview`もあります。

## データ形式

経歴データは別リポジトリ`phinesze-careers-data`で生成した`careerHistory.json`を想定しています。正確な定義は型定義（[src/types/](src/types/)）とJSON Schema（[src/schemas/CareerHistory.schema.json](src/schemas/CareerHistory.schema.json)）を参照してください。

```jsonc
{
  "updatedAt": "2025-01-01",
  "sections": [
    // 文章セクション（Markdown可）
    { "type": "document", "label": "職務要約", "detail": "..." },
    // プロジェクト一覧セクション
    {
      "type": "project-groups",
      "groups": [
        {
          "company": "実名（機密モード時のみ表示）",
          "companyAlias": "通常表示用の会社名",
          "url": "https://example.com",
          "projects": [
            {
              "title": "案件名",
              "detail": "詳細（Markdown）",
              "secretDetail": "機密モード用の詳細",
              "times": { "start": "2020-04", "end": "2021-03" },
              "teams": [
                { "category": "全体", "detail": "10名" },
                { "category": "開発", "detail": "5名" },
              ],
              "environments": [
                {
                  "category": "言語",
                  "environments": [
                    { "name": "TypeScript" },
                    { "name": "Node.js", "version": "20" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
```

## ディレクトリ構成

```
src/
├── app/            # ページ（/ と /preview）、globals.css
├── components/
│   ├── atoms/ molecules/ organisms/  # プレビュー表示用（Atomic Design）
│   └── rjsf/       # 編集フォーム（RJSF）のカスタムテンプレート・フィールド
├── composables/    # 状態管理（jotai）、ファイル入出力、表示切り替えのフック
├── schemas/        # JSON Schema と RJSF の UI スキーマ
├── types/          # 経歴データの型定義
└── utils/          # ユーティリティ（cn など）
```

## スクリプト

| コマンド           | 内容                          |
| ------------------ | ----------------------------- |
| `npm run dev`      | 開発サーバー起動（Turbopack） |
| `npm run build`    | 本番ビルド                    |
| `npm run start`    | 本番サーバー起動              |
| `npm run lint`     | ESLint実行                    |
| `npm run lint:fix` | ESLint自動修正                |
| `npm run format`   | Prettierによる整形            |

## 使用技術

Next.js 15 / React 19 / TypeScript / Tailwind CSS 4 / MUI / react-jsonschema-form（RJSF）/ ajv / jotai / markdown-it
