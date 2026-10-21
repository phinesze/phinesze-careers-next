import { CompanyRowObjectFieldTemplate } from "@/components/rjsf/CompanyRowObjectFieldTemplate";
import { TwoObjectFieldTemplate } from "@/components/rjsf/TwoObjectFieldTemplate";
import { DataGridArrayField } from "@/components/rjsf/DataGridArrayField";
import { SectionTypeWidget } from "@/components/rjsf/SectionTypeWidget";
import { MonthOrDateWidget } from "@/components/rjsf/MonthOrDateWidget";
import { TextFieldWidget } from "@/components/rjsf/TextFieldWIdget";

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
      // 種別変更時に記述内容が消去されるため、確認ダイアログを出す
      "ui:widget": SectionTypeWidget,
      anyOf: [
        // ドキュメントセクション
        {
          "ui:title": "ドキュメントセクション",
          "ui:description":
            "ドキュメントセクションは、自己PRや全体の経歴を自由形式で記述するセクションです。",
          label: {
            "ui:title": "ラベル",
            "ui:description":
              "ドキュメントセクションの見出し部分のラベルを入力してください。",
            "ui:widget": TextFieldWidget,
          },
          detail: {
            "ui:title": "詳細",
            "ui:description":
              "ドキュメントの本文を自由形式で入力してください。Markdown形式で記述できます。",
            "ui:widget": TextFieldWidget,
            "ui:options": { rows: 10 },
          },
          type: { "ui:widget": "hidden" },
        },
        // プロジェクトセクション
        {
          "ui:title": "プロジェクトグループセクション",
          "ui:description":
            "プロジェクトグループセクションは、所属した組織・期間ごとに、1つ以上のプロジェクトをまとめて記述するセクションです。",
          groups: {
            "ui:title": "組織内のプロジェクト一覧",
            "ui:description":
              "同じ組織に連続して所属した期間ごとに、1つ以上のプロジェクトをまとめて入力してください。",
            items: {
              "ui:title": "",
              "ui:ObjectFieldTemplate": CompanyRowObjectFieldTemplate,
              company: {
                "ui:title": "会社／組織名",
                "ui:description":
                  "会社／組織名を入力してください（機密要素ありの場合のみ表示）。",
                "ui:widget": TextFieldWidget,
              },
              companyAlias: {
                "ui:title": "会社／組織名のエイリアス",
                "ui:description":
                  "会社名を伏せる場合に、代わりに表示する名称（例：A社）を入力してください（機密要素なしの場合に表示）。",
                "ui:widget": TextFieldWidget,
              },
              url: {
                "ui:title": "会社／組織のURL",
                "ui:description":
                  "会社／組織のURLを入力してください（表示は未実装）。",
                "ui:widget": TextFieldWidget,
              },
              projects: {
                "ui:title": "組織内で携わったプロジェクト",
                items: {
                  "ui:title": "",
                  title: {
                    "ui:title": "タイトル",
                    "ui:description":
                      "プロジェクトのタイトル（概要）を入力してください。",
                    "ui:widget": TextFieldWidget,
                  },
                  detail: {
                    "ui:title": "詳細",
                    "ui:description":
                      "各プロジェクトの詳細を自由形式で入力してください。Markdown形式で記述できます。",
                    "ui:widget": TextFieldWidget,
                    "ui:options": { rows: 5 },
                  },
                  secretDetail: {
                    "ui:title": "詳細（機密要素）",
                    "ui:description":
                      "機密要素ありの場合にのみ表示される、プロジェクトの詳細を入力してください。Markdown形式で記述できます。",
                    "ui:widget": TextFieldWidget,
                    "ui:options": { rows: 5 },
                  },
                  environments: {
                    "ui:title": "使用環境",
                    "ui:description":
                      "各プロジェクトの使用環境（言語、フレームワーク、ライブラリ、OS、DB、クラウドサービスなど）を入力してください。",
                    items: {
                      "ui:title": "",
                      category: {
                        "ui:title":
                          "カテゴリ名（フロントエンド／バックエンドなど）",
                        "ui:widget": TextFieldWidget,
                      },
                      environments: {
                        "ui:title": "カテゴリ内の言語・フレームワーク",
                        "ui:field": DataGridArrayField,
                        items: {
                          "ui:title": "",
                          "ui:ObjectFieldTemplate": TwoObjectFieldTemplate,
                          name: {
                            "ui:title": "名称",
                            "ui:widget": TextFieldWidget,
                          },
                          version: {
                            "ui:title": "バージョン",
                            "ui:widget": TextFieldWidget,
                          },
                        },
                      },
                    },
                  },
                  teams: {
                    "ui:title": "チーム",
                    "ui:description":
                      "各プロジェクトのチーム人数を入力してください。「カテゴリ名」には「開発」「PM」など、「チーム人数など」には「約8〜10人」などを入力します。",
                    "ui:field": DataGridArrayField,
                    items: {
                      category: {
                        "ui:title": "カテゴリ名",
                        "ui:widget": TextFieldWidget,
                      },
                      detail: {
                        "ui:title": "チーム人数など",
                        "ui:widget": TextFieldWidget,
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
