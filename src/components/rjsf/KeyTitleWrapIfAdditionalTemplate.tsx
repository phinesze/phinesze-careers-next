import {
  ADDITIONAL_PROPERTY_FLAG,
  buttonId,
  getUiOptions,
  TranslatableString,
  WrapIfAdditionalTemplateProps,
} from "@rjsf/utils";
import { Grid, TextField } from "@mui/material";

/**
 * additionalProperties のキー入力欄のラベルを uiSchema の "ui:keyTitle" で指定できる WrapIfAdditionalTemplate
 * 未指定の場合は RJSF 標準の "<キー名> Key" を表示する
 */
export function KeyTitleWrapIfAdditionalTemplate(
  props: WrapIfAdditionalTemplateProps,
) {
  const {
    children,
    classNames,
    style,
    disabled,
    id,
    label,
    displayLabel,
    onKeyRenameBlur,
    onRemoveProperty,
    readonly,
    required,
    schema,
    uiSchema,
    registry,
  } = props;
  const { templates, translateString } = registry;
  const { RemoveButton } = templates.ButtonTemplates;

  if (!(ADDITIONAL_PROPERTY_FLAG in schema)) {
    return (
      <div className={classNames} style={style}>
        {children}
      </div>
    );
  }

  const keyTitle = getUiOptions(uiSchema).keyTitle;
  const keyLabel =
    typeof keyTitle === "string"
      ? keyTitle
      : translateString(TranslatableString.KeyLabel, [label]);

  return (
    <Grid
      container
      spacing={2}
      className={classNames}
      style={style}
      sx={{ alignItems: "flex-start" }}
    >
      <Grid size={5.5}>
        <TextField
          key={label}
          fullWidth
          required={required}
          label={displayLabel ? keyLabel : undefined}
          defaultValue={label}
          disabled={disabled || readonly}
          id={`${id}-key`}
          name={`${id}-key`}
          onBlur={!readonly ? onKeyRenameBlur : undefined}
          type="text"
        />
      </Grid>
      <Grid size={5.5}>{children}</Grid>
      <Grid sx={{ mt: 1.5 }}>
        <RemoveButton
          id={buttonId(id, "remove")}
          className="rjsf-object-property-remove"
          iconType="default"
          style={{ flex: 1, paddingLeft: 6, paddingRight: 6, fontWeight: "bold" }}
          disabled={disabled || readonly}
          onClick={onRemoveProperty}
          uiSchema={uiSchema}
          registry={registry}
        />
      </Grid>
    </Grid>
  );
}
