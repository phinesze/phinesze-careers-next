"use client";

import { useCareerHistoryState } from "@/composables/useCareerHistoryState";
import Form from "@rjsf/mui";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RJSFSchema } from "@rjsf/utils";
import { customizeValidator } from "@rjsf/validator-ajv8";
import careerHistorySchema from "@/schemas/CareerHistory.schema.json";
import { careerHistoryUiSchema } from "@/schemas/careerHistoryUiSchema";
import { KeyTitleWrapIfAdditionalTemplate } from "@/components/rjsf/KeyTitleWrapIfAdditionalTemplate";
import { ArrayFieldItemTemplate } from "@/components/rjsf/ArrayFieldItemTemplate";
import { ArrayFieldTemplate } from "@/components/rjsf/ArrayFieldTemplate";
import { ArrayFieldItemButtonsTemplate } from "@/components/rjsf/ArrayFieldItemButtonsTemplate";
import { Box, useMediaQuery } from "@mui/material";

const validator = customizeValidator();

export default function IndexPage() {
  const { careerHistory, setCareerHistory } = useCareerHistoryState();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const formTheme = createTheme({
    typography: { fontSize: 12 },
    // theme.spacing(1) の単位 (デフォルト 8px)。Grid の spacing や Paper/Box の padding がまとめて縮む
    spacing: 2,
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          // 入力欄内側の余白 (size="small" のデフォルトは 8.5px 14px)
          input: { padding: "6px 6px" },
        },
      },
      MuiTextField: { defaultProps: { size: "small", margin: "dense" } },
      MuiFormControl: { defaultProps: { size: "small", margin: "dense" } },
      MuiSelect: { defaultProps: { size: "small" } },
      MuiCheckbox: { defaultProps: { size: "small" } },
      MuiButton: { defaultProps: { size: "small" } },
      MuiIconButton: { defaultProps: { size: "small" } },
    },
    palette: { mode: prefersDarkMode ? "dark" : "light" },
  });

  return (
    <div className="m-5 max-w-300 not-print:pt-[8mm]">
      <div className="text-lg font-bold ">Careers 職務経歴書表示用システム</div>
      <ThemeProvider theme={formTheme}>
        <Box sx={{ "& textarea": { resize: "vertical" } }}>
          <Form
            schema={careerHistorySchema as RJSFSchema}
            uiSchema={careerHistoryUiSchema}
            validator={validator}
            templates={{
              WrapIfAdditionalTemplate: KeyTitleWrapIfAdditionalTemplate,
              ArrayFieldTemplate,
              ArrayFieldItemTemplate,
              ArrayFieldItemButtonsTemplate,
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
    </div>
  );
}
