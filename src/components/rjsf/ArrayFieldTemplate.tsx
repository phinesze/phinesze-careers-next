import {
  ArrayFieldTemplateProps,
  buttonId,
  getTemplate,
  getUiOptions,
} from "@rjsf/utils";
import { Box, Button, Paper } from "@mui/material";
import { createContext } from "react";
import { cn } from "@/utils/cn";

export const FLEX_FIELDS = ["environments", "teams"];

export const ArrayFieldTemplateContext = createContext<{
  title: string;
  isShortFields: boolean;
}>({
  title: "",
  isShortFields: false,
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

  return (
    <Paper elevation={0} className="rounded-md border border-gray-300">
      <Box className="px-1 py-1">
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
        <Box className={cn(FLEX_FIELDS.includes(title) && "flex flex-wrap")}>
          <ArrayFieldTemplateContext.Provider
            value={{ title, isShortFields: !!FLEX_FIELDS.includes(title) }}
          >
            {items}
          </ArrayFieldTemplateContext.Provider>
        </Box>
        {canAdd && (
          <Box className="mb-1 flex items-center justify-end">
            <Button onClick={onAddClick}>
              {`${uiOptions.title}を追加`}{" "}
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
    </Paper>
  );
}
