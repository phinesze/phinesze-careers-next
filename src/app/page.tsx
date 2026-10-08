"use client";

import { useCareerHistoryState } from "@/composables/useCareerHistoryState";
import Form from "@rjsf/mui";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RJSFSchema } from "@rjsf/utils";
import { customizeValidator } from "@rjsf/validator-ajv8";
import careerHistorySchema from "@/schemas/CareerHistory.schema.json";
import { CareerHistory } from "@/types/CareerHistory";
import CompanyRowObjectFieldTemplate from "@/components/rjsf/CompanyRowObjectFieldTemplate";
import TwoObjectFieldTemplate from "@/components/rjsf/TwoObjectFieldTemplate";
import KeyTitleWrapIfAdditionalTemplate from "@/components/rjsf/KeyTitleWrapIfAdditionalTemplate";
import ArrayFieldItemTemplate from "@/components/rjsf/ArrayFieldItemTemplate";
import ArrayFieldTemplate from "@/components/rjsf/ArrayFieldTemplate";
import { Box } from "@mui/material";

const validator = customizeValidator<CareerHistory>();

const formTheme = createTheme({
  typography: { fontSize: 12 },
  // theme.spacing(1) の単位 (デフォルト 8px)。Grid の spacing や Paper/Box の padding がまとめて縮む
  spacing: 4,
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        // 入力欄内側の余白 (size="small" のデフォルトは 8.5px 14px)
        input: { padding: "6px 8px" },
      },
    },
    MuiTextField: { defaultProps: { size: "small", margin: "dense" } },
    MuiFormControl: { defaultProps: { size: "small", margin: "dense" } },
    MuiSelect: { defaultProps: { size: "small" } },
    MuiCheckbox: { defaultProps: { size: "small" } },
    MuiButton: { defaultProps: { size: "small" } },
    MuiIconButton: { defaultProps: { size: "small" } },
  },
});

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
                "ui:title": "会社／組織名のエイリアス",
                "ui:description":
                  "会社／組織名を伏せ字にする際の名称を入力してください。",
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
                    "ui:options": { rows: 5 },
                  },
                  secretDetail: {
                    "ui:title": "秘密の詳細",
                    "ui:description":
                      "機密表示にした場合にのみ表示されるプロジェクトの詳細を自由形式で記述する。Markdown形式で記述することができます",
                    "ui:widget": "textarea",
                    "ui:options": { rows: 5 },
                  },
                  environments: {
                    "ui:title": "言語・フレームワーク",
                    "ui:description":
                      "各プロジェクトの環境を記述する。使用言語、フレームワーク、ライブラリ、OS、DB、クラウドサービスなどを記述することができます。",
                    items: {
                      "ui:title": "言語・フレームワーク項目",
                      category: {
                        "ui:title":
                          "カテゴリ名（フロントエンド／バックエンドなど）",
                        "ui:widget": "text",
                      },
                      environments: {
                        "ui:title": "",
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
                      "各プロジェクトのチーム人数を記述します。",
                    "ui:field": "ObjectField",
                    "ui:options": {
                      addable: true,
                      orderable: false,
                      newKeyName: "PM", // /Users/inoueshinichi01/Projects/phinesze-careers-next/patches/@rjsf+core+6.11.0.patch
                    },
                    additionalProperties: {
                      "ui:title": "チーム人数など",
                      "ui:keyTitle": "カテゴリ名（開発／PMなど）",
                      "ui:description":
                        "人数を文字列で記述します（例: 約8~10人）。",
                      "ui:widget": "text",
                    },
                  },
                  times: {
                    "ui:title": "期間",
                    "ui:description":
                      "各プロジェクトの期間を記述する。YYYY-MM形式で記述することができます。",
                    "ui:ObjectFieldTemplate": TwoObjectFieldTemplate,
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
    <div className="m-5 max-w-300 bg-white not-print:pt-[8mm]">
      <div className="text-lg font-bold ">Careers 職務経歴書表示用システム</div>
      <ThemeProvider theme={formTheme}>
        <Box sx={{ "& textarea": { resize: "vertical" } }}>
          <Form
            schema={careerHistorySchema as RJSFSchema}
            uiSchema={uiSchema}
            validator={validator}
            templates={{
              WrapIfAdditionalTemplate: KeyTitleWrapIfAdditionalTemplate,
              ArrayFieldTemplate,
              ArrayFieldItemTemplate,
            }}
            formData={careerHistory}
            onChange={(event) =>
              event.formData && setCareerHistory(event.formData)
            }
          >
            {/* submitボタンを非表示にするため空のfragmentを渡す */}
            <></>
          </Form>
        </Box>
      </ThemeProvider>

      <div>{JSON.stringify(careerHistory)}</div>
    </div>
  );
}
