"use client";

import { useCareerHistoryState } from "@/composables/useCareerHistoryState";
import Form from "@rjsf/mui";

import { RJSFSchema } from "@rjsf/utils";
import { customizeValidator } from "@rjsf/validator-ajv8";
import careerHistorySchema from "@/schemas/CareerHistory.schema.json";
import { CareerHistory } from "@/types/CareerHistory";
import CompanyRowObjectFieldTemplate from "@/components/rjsf/CompanyRowObjectFieldTemplate";

const validator = customizeValidator<CareerHistory>();

const uiSchema = {
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
              "ドキュメントセクションの見出し部分のラベルを入力してください",
            "ui:widget": "text",
          },
          detail: {
            "ui:title": "詳細",
            "ui:description":
              "ドキュメントの本文を自由形式で記述する。Markdown形式で記述することができる",
            "ui:widget": "textarea",
            "ui:options": { rows: 10 },
          },
          type: { "ui:widget": "hidden" },
        },
        // [1] ProjectGroupSection
        {
          "ui:title": "プロジェクトグループセクション",
          "ui:description":
            "プロジェクトグループセクションは、複数のプロジェクトをグループ化して記述するセクションです。",
          "ui:help": "プロジェクトグループセクションの詳細を入力してください",
          groups: {
            "ui:title": "会社／組織別のプロジェクトグループ",
            "ui:description":
              "連続した期間内の同じ会社／組織内の1つまたは複数のプロジェクトをグループ化して記述してください。",
            items: {
              "ui:title": "",
              "ui:ObjectFieldTemplate": CompanyRowObjectFieldTemplate,
              company: {
                "ui:title": "会社／組織名",
                "ui:description": "会社／組織名を入力してください。",
                "ui:widget": "text",
              },
              companyAlias: {
                "ui:title": "会社／組織名の略称",
                "ui:description":
                  "会社／組織名の略称を入力してください。省略形や通称などを入力することができます。",
                "ui:widget": "text",
              },
              url: {
                "ui:title": "会社／組織のURL",
                "ui:description": "会社／組織のURLを入力してください。",
                "ui:widget": "text",
              },
              projects: {
                "ui:title": "プロジェクト",
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
                    "ui:options": { rows: 10 },
                  },
                  secretDetail: {
                    "ui:title": "秘密の詳細",
                    "ui:description":
                      "機密表示にした場合にのみ表示されるプロジェクトの詳細を自由形式で記述する。Markdown形式で記述することができます",
                    "ui:widget": "textarea",
                    "ui:options": { rows: 10 },
                  },
                  environments: {
                    "ui:title": "環境",
                    "ui:description":
                      "各プロジェクトの環境を記述する。使用言語、フレームワーク、ライブラリ、OS、DB、クラウドサービスなどを記述することができます。",
                    "ui:options": { orderable: false },
                    "ui:additionalProperties": {
                      "ui:title": "環境カテゴリ",
                      items: {
                        "ui:title": "環境項目",
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
                  teams: {
                    "ui:title": "チーム",
                    "ui:description":
                      "各プロジェクトのチーム人数を記述します。",
                    "ui:field": "ObjectField",
                    // TODO 入力途中
                  },
                  times: {
                    "ui:title": "期間",
                    "ui:description":
                      "各プロジェクトの期間を記述する。YYYY-MM形式で記述することができます。",
                    start: {
                      "ui:title": "開始",
                      "ui:widget": "date",
                    },
                    end: {
                      "ui:title": "終了",
                      "ui:widget": "date",
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

export default function IndexPage() {
  const { careerHistory, setCareerHistory } = useCareerHistoryState();

  return (
    <div className="m-5 bg-white not-print:pt-[8mm]">
      <div className="text-lg font-bold">Careers 職務経歴書表示用システム</div>

      <Form
        schema={careerHistorySchema as RJSFSchema}
        uiSchema={uiSchema}
        validator={validator}
        formData={careerHistory}
        onChange={(event) => event.formData && setCareerHistory(event.formData)}
      >
        {/* submitボタンを非表示にするため空のfragmentを渡す */}
        <></>
      </Form>

      <div>{JSON.stringify(careerHistory)}</div>
    </div>
  );
}
