import { ArrayFieldItemButtonsTemplateProps, buttonId } from "@rjsf/utils";
import { Box } from "@mui/material";

export function ArrayFieldItemButtonsTemplate(
  props: ArrayFieldItemButtonsTemplateProps,
) {
  const {
    disabled,
    hasCopy,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    fieldPathId,
    onCopyItem,
    onRemoveItem,
    onMoveDownItem,
    onMoveUpItem,
    readonly,
    registry,
    uiSchema,
  } = props;
  const { formData } = props as ArrayFieldItemButtonsTemplateProps & {
    formData?: unknown;
  };
  void formData;
  const { CopyButton, MoveDownButton, MoveUpButton, RemoveButton } =
    registry.templates.ButtonTemplates;

  return (
    // AccordionSummary内に配置されるため、ボタンのクリックでアコーディオンが開閉しないようにする
    <Box
      component="span"
      className="ml-2 inline-flex items-center"
      onClick={(event) => event.stopPropagation()}
      onFocus={(event) => event.stopPropagation()}
    >
      {(hasMoveUp || hasMoveDown) && (
        <MoveUpButton
          id={buttonId(fieldPathId, "moveUp")}
          className="rjsf-array-item-move-up"
          disabled={disabled || readonly || !hasMoveUp}
          onClick={onMoveUpItem}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {(hasMoveUp || hasMoveDown) && (
        <MoveDownButton
          id={buttonId(fieldPathId, "moveDown")}
          className="rjsf-array-item-move-down"
          disabled={disabled || readonly || !hasMoveDown}
          onClick={onMoveDownItem}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {hasCopy && (
        <CopyButton
          id={buttonId(fieldPathId, "copy")}
          className="rjsf-array-item-copy"
          disabled={disabled || readonly}
          onClick={onCopyItem}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {hasRemove && (
        <RemoveButton
          id={buttonId(fieldPathId, "remove")}
          className="rjsf-array-item-remove"
          disabled={disabled || readonly}
          onClick={() => {
            if (confirm("削除しますか？")) {
              onRemoveItem();
            }
          }}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
    </Box>
  );
}
