import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import {
  ArrayFieldItemButtonsTemplateProps,
  TranslatableString,
  buttonId,
} from "@rjsf/utils";

export function ArrayFieldItemButtonsTemplate(
  props: ArrayFieldItemButtonsTemplateProps,
) {
  const {
    // disabled,
    hasCopy,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    fieldPathId,
    onCopyItem,
    onRemoveItem,
    onMoveDownItem,
    onMoveUpItem,
    // readonly,
    registry,
    uiSchema,
  } = props;

  const { CopyButton, MoveDownButton, MoveUpButton } =
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
          disabled={!hasMoveUp}
          onClick={onMoveUpItem}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {(hasMoveUp || hasMoveDown) && (
        <MoveDownButton
          id={buttonId(fieldPathId, "moveDown")}
          className="rjsf-array-item-move-down"
          disabled={!hasMoveDown}
          onClick={onMoveDownItem}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {hasCopy && (
        <CopyButton
          id={buttonId(fieldPathId, "copy")}
          className="rjsf-array-item-copy"
          onClick={onCopyItem}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {hasRemove && (
        <IconButton
          id={buttonId(fieldPathId, "remove")}
          className="rjsf-array-item-remove"
          size="small"
          color="error"
          title={registry.translateString(TranslatableString.RemoveButton)}
          onClick={() => {
            if (confirm("削除しますか？")) {
              onRemoveItem();
            }
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}
