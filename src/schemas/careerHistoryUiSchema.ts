import { CompanyRowObjectFieldTemplate } from "@/components/rjsf/CompanyRowObjectFieldTemplate";
import { TwoObjectFieldTemplate } from "@/components/rjsf/TwoObjectFieldTemplate";
import { DataGridArrayField } from "@/components/rjsf/DataGridArrayField";
import { MonthOrDateWidget } from "@/components/rjsf/MonthOrDateWidget";

export const careerHistoryUiSchema = {
  updatedAt: {
    "ui:title": "更新日",
    "ui:widget": "date",
  },
  // anyOf または oneOf が定義されているプロパティ名
  sections: {
    "ui:title": "セクション",
    "ui:description":
      "セクションの種類は、ドキュメントセクションとプロジェクトグループセクションの2種類があります。どちらかを選択してください。",
    items: {
      // スキーマの anyOf と同じ順番の配列で指定する
      "ui:title": "セクション種別",
      anyOf: [
        // [0] DocumentSection
        {
          "ui:title": "ドキュメントセクション",
          "ui:description":
            "ドキュメントセクションは、自己PRや全体の経歴を自由形式で記述するセクションです。",
          label: {
            "ui:title": "ラベル",
            "ui:description":
              "ドキュメントセクションの見出し部分のラベルを入力してください。",
            "ui:widget": "text",
          },
          detail: {
            "ui:title": "詳細",
            "ui:description":
              "ドキュメントの本文を自由形式で記述する。Markdown形式で記述することができます。",
            "ui:widget": "textarea",
            "ui:options": { rows: 10 },
          },
          type: { "ui:widget": "hidden" },
        },
        // [1] ProjectGroupSection
        {
          "ui:title": "プロジェクトグループセクション",
          "ui:description":
            "プロジェクトグループセクションは、複数のプロジェクトを一連の組織に属した期間別にグループ化して記述するセクションです。",
          "ui:help": "プロジェクトグループセクションの詳細を入力してください。",
          groups: {
            "ui:title": "組織内のプロジェクト一覧",
            "ui:description":
              "連続した期間内の同じ組織内の1つまたは複数のプロジェクトをグループ化して記述してください。",
            items: {
              "ui:title": "",
              "ui:ObjectFieldTemplate": CompanyRowObjectFieldTemplate,
              company: {
                "ui:title": "会社／組織名",
                "ui:description":
                  "会社／組織名を入力（機密要素ありの場合のみ表示）",
                "ui:widget": "text",
              },
              companyAlias: {
                "ui:title": "会社／組織名のエイリアス",
                "ui:description":
                  "会社／組織名を伏せ字にする際の名称を入力（機密要素なしの場合に代わりに表示）",
                "ui:widget": "text",
              },
              url: {
                "ui:title": "会社／組織のURL",
                "ui:description": "会社／組織のURLを入力（表示未実装）",
                "ui:widget": "text",
              },
              projects: {
                "ui:title": "組織内で携わったプロジェクト",
                items: {
                  "ui:title": "",
                  title: {
                    "ui:title": "タイトル",
                    "ui:description":
                      "各プロジェクトの概要を入力してください。",
                    "ui:widget": "text",
                  },
                  detail: {
                    "ui:title": "詳細",
                    "ui:description":
                      "各プロジェクトの詳細を自由形式で記述する。Markdown形式で記述することができます。",
                    "ui:widget": "textarea",
                    "ui:options": { rows: 5 },
                  },
                  secretDetail: {
                    "ui:title": "詳細（機密要素）",
                    "ui:description":
                      "機密要素ありにした場合にのみ表示されるプロジェクトの詳細を自由形式で記述する。Markdown形式で記述することができます",
                    "ui:widget": "textarea",
                    "ui:options": { rows: 5 },
                  },
                  environments: {
                    "ui:title": "言語・フレームワークのカテゴリ",
                    "ui:description":
                      "各プロジェクトの環境を記述する。使用言語、フレームワーク、ライブラリ、OS、DB、クラウドサービスなどを記述することができます。",
                    items: {
                      "ui:title": "",
                      category: {
                        "ui:title":
                          "カテゴリ名（フロントエンド／バックエンドなど）",
                        "ui:widget": "text",
                      },
                      environments: {
                        "ui:title": "カテゴリ内の言語・フレームワーク",
                        "ui:field": DataGridArrayField,
                        items: {
                          "ui:title": "",
                          "ui:ObjectFieldTemplate": TwoObjectFieldTemplate,
                          name: {
                            "ui:title": "名称",
                            "ui:widget": "text",
                          },
                          version: {
                            "ui:title": "バージョン",
                            "ui:widget": "text",
                          },
                        },
                      },
                    },
                  },
                  teams: {
                    "ui:title": "チーム",
                    "ui:description":
                      "各プロジェクトのチーム人数を記述します。「カテゴリ名」には「開発」／「PM」などを記述、「チーム人数など」には「約8~10人」などを記述",
                    "ui:field": DataGridArrayField,
                    items: {
                      category: {
                        "ui:title": "カテゴリ名",
                        "ui:widget": "text",
                      },
                      detail: {
                        "ui:title": "チーム人数など",
                        "ui:widget": "text",
                      },
                    },
                  },
                  times: {
                    "ui:title": "期間",
                    "ui:description":
                      "各プロジェクトの開始／終了時期を選択してください。",
                    "ui:ObjectFieldTemplate": TwoObjectFieldTemplate,
                    start: {
                      "ui:title": "開始時期",
                      "ui:widget": MonthOrDateWidget,
                    },
                    end: {
                      "ui:title": "終了時期",
                      "ui:widget": MonthOrDateWidget,
                    },
                  },
                },
              },
            },
          },
          type: { "ui:widget": "hidden" },
        },
      ],
    },
  },
};
