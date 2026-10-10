import {
  ArrayFieldTemplateProps,
  buttonId,
  getTemplate,
  getUiOptions,
} from "@rjsf/utils";
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
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;

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
        <Box className="mb-1 flex items-center justify-end">
          <Button onClick={onAddClick}>
            {titles[title] || uiOptions.title}
            {`を追加`}
            <AddButton
              id={buttonId(fieldPathId, "add")}
              className="rjsf-array-item-add"
              disabled={disabled || readonly}
              uiSchema={uiSchema}
              registry={registry}
            />
          </Button>
        </Box>
      )}
    </Box>
  );
}
