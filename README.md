# phinesze-careers-next

職務経歴書をJSONデータ（`careerHistory.json`）から表示・印刷（PDF出力）するためのNext.jsアプリです。

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

1. トップページの「プレビューページへ移動」から`/preview`を開く
2. ヘッダーの「careerHistory JSONファイル選択」で経歴データのJSONを読み込む
3. 「印刷」ボタン（またはブラウザの印刷）で印刷・PDF保存する（ヘッダーは印刷時に非表示）

### URLクエリパラメーター

| パラメーター   | 説明                                                    |
| -------------- | ------------------------------------------------------- |
| `is_secrets=1` | 機密モード。会社の実名（`company`）や機密情報を表示する |

例: `http://localhost:3000/preview?is_secrets=1`

## データ形式

経歴データは別リポジトリ`phinesze-careers-data`の`careerHistory.json`を想定しています。型定義は[src/types/](src/types/)を参照してください。

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
          "projects": [
            {
              "id": 1,
              "title": "案件名",
              "detail": "詳細（Markdown）",
              "secretDetail": "機密モード用の詳細",
              "times": { "start": "2020-04", "end": "2021-03" },
              "teams": { "全体": 10, "開発": 5 },
              "environments": {
                "言語": ["TypeScript", ["Node.js", { "version": 20 }]],
              },
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
├── components/     # atoms / molecules / organisms（Atomic Design）
├── composables/    # 状態管理（jotai）とプレビュー関連のフック
└── types/          # 経歴データの型定義
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

Next.js 15 / React 19 / TypeScript / Tailwind CSS 4 / jotai / markdown-it
