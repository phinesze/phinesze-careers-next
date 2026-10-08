import {
  ArrayFieldTemplateProps,
  buttonId,
  getTemplate,
  getUiOptions,
} from "@rjsf/utils";
import { Box, Button, Paper } from "@mui/material";

/**
 * @rjsf/mui 標準の ArrayFieldTemplate は elevation 付きの Paper と p: 2 の余白で囲むため、
 * 入れ子になると影と余白が重なって見づらい。枠線のみの Paper にして余白を詰め、
 * 追加ボタンは右寄せで表示する。
 */
export default function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
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
        {items}
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
