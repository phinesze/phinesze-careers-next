import {
  ArrayFieldTemplateProps,
  getTemplate,
  getUiOptions,
} from "@rjsf/utils";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { createContext, useContext } from "react";
import { cn } from "@/utils/cn";
import { CustomUiTitleContext } from "./CustomUiTitleContext";

export const FLEX_FIELDS = ["environments", "teams"];

export const ArrayFieldTemplateContext = createContext<{
  title: string;
  minItems: number;
}>({
  title: "",
  minItems: 0,
});

export function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
  const {
    canAdd,
    disabled,
    fieldPathId,
    uiSchema,
    items,
    optionalDataControl,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title,
  } = props;
  const uiOptions = getUiOptions(uiSchema);
  const ArrayFieldDescriptionTemplate = getTemplate(
    "ArrayFieldDescriptionTemplate",
    registry,
    uiOptions,
  );
  const ArrayFieldTitleTemplate = getTemplate(
    "ArrayFieldTitleTemplate",
    registry,
    uiOptions,
  );
  const showOptionalDataControlInTitle = !readonly && !disabled;

  console.log("props", props);

  const { titles } = useContext(CustomUiTitleContext);

  return (
    <Box className="px-1 py-1 ">
      <ArrayFieldTitleTemplate
        fieldPathId={fieldPathId}
        title={uiOptions.title || title}
        schema={schema}
        uiSchema={uiSchema}
        required={required}
        registry={registry}
        optionalDataControl={
          showOptionalDataControlInTitle ? optionalDataControl : undefined
        }
      />
      <ArrayFieldDescriptionTemplate
        fieldPathId={fieldPathId}
        description={uiOptions.description || schema.description}
        schema={schema}
        uiSchema={uiSchema}
        registry={registry}
      />
      {!showOptionalDataControlInTitle ? optionalDataControl : undefined}
      <Box className={cn(FLEX_FIELDS.includes(title) && "flex flex-wrap ")}>
        <ArrayFieldTemplateContext.Provider
          value={{
            title,
            minItems: schema.minItems ?? 0,
          }}
        >
          {items}
        </ArrayFieldTemplateContext.Provider>
      </Box>
      {canAdd && (
        <Box className="m-0 flex items-center justify-end">
          <Button startIcon={<AddIcon />} onClick={onAddClick} sx={{ mt: 2 }}>
            {titles[title] || uiOptions.title}
            {`を追加`}
          </Button>
        </Box>
      )}
    </Box>
  );
}
