"use client";

import { useCareerHistoryState } from "@/composables/useCareerHistoryState";
import Form from "@rjsf/mui";
import { RJSFSchema } from "@rjsf/utils";
import { customizeValidator } from "@rjsf/validator-ajv8";
import careerHistorySchema from "@/schemas/CareerHistory.schema.json";
import { careerHistoryUiSchema } from "@/schemas/careerHistoryUiSchema";
import { KeyTitleWrapIfAdditionalTemplate } from "@/components/rjsf/KeyTitleWrapIfAdditionalTemplate";
import { ArrayFieldItemTemplate } from "@/components/rjsf/ArrayFieldItemTemplate";
import { ArrayFieldTemplate } from "@/components/rjsf/ArrayFieldTemplate";
import { ArrayFieldItemButtonsTemplate } from "@/components/rjsf/ArrayFieldItemButtonsTemplate";
import { Box } from "@mui/material";

const validator = customizeValidator();

export function CareerEditHistoryEdit() {
  const { careerHistory, setCareerHistory, setIsChanged } =
    useCareerHistoryState();

  return (
    <div className="m-5 max-w-300 not-print:pt-[8mm]">
      {/* <ThemeProvider theme={formTheme}> */}
      <Box>
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
          onChange={(event) => {
            if (event.formData) {
              setCareerHistory(event.formData);
              setIsChanged(true);
            }
          }}
        >
          {/* submitボタンを非表示にするため空のfragmentを渡す */}
          <></>
        </Form>
      </Box>
      {/* </ThemeProvider> */}
    </div>
  );
}
