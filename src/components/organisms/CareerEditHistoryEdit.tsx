"use client";

import { Box } from "@mui/material";
import Form from "@rjsf/mui";
import { RJSFSchema } from "@rjsf/utils";
import { customizeValidator } from "@rjsf/validator-ajv8";
import { useAtom, useSetAtom } from "jotai";
import { ArrayFieldItemButtonsTemplate } from "@/components/rjsf/ArrayFieldItemButtonsTemplate";
import { ArrayFieldItemTemplate } from "@/components/rjsf/ArrayFieldItemTemplate";
import { ArrayFieldTemplate } from "@/components/rjsf/ArrayFieldTemplate";
import { KeyTitleWrapIfAdditionalTemplate } from "@/components/rjsf/KeyTitleWrapIfAdditionalTemplate";
import careerHistorySchema from "@/schemas/CareerHistory.schema.json";
import { careerHistoryUiSchema } from "@/schemas/careerHistoryUiSchema";
import {
  careerHistoryAtom,
  isChangedAtom,
} from "@/store/useCareerHistoryState";

const validator = customizeValidator();

export function CareerEditHistoryEdit() {
  const [careerHistory, setCareerHistory] = useAtom(careerHistoryAtom);
  const setIsChanged = useSetAtom(isChangedAtom);

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
              // データを変更したら必ず「変更あり」にする
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
