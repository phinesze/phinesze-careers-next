import {
  ArrayFieldItemTemplateProps,
  getTemplate,
  getUiOptions,
} from "@rjsf/utils";
import { Box, Paper } from "@mui/material";

/**
 * @rjsf/mui 標準の ArrayFieldItemTemplate は項目本体を Grid の xs=8〜11 に収めるため、
 * 入れ子になるたびに幅が縮んでいく。本体を flex: 1 で残り幅いっぱいに広げ、
 * ボタン類は必要な幅だけ取るようにする。
 */
export default function ArrayFieldItemTemplate(
  props: ArrayFieldItemTemplateProps,
) {
  const { children, buttonsProps, hasToolbar, uiSchema, registry } = props;
  const uiOptions = getUiOptions(uiSchema);
  const ArrayFieldItemButtonsTemplate = getTemplate(
    "ArrayFieldItemButtonsTemplate",
    registry,
    uiOptions,
  );

  return (
    <Box className="my-4 flex items-start gap-2">
      <Paper
        elevation={0}
        className="min-w-0 flex-1 rounded-md border border-gray-300"
      >
        {hasToolbar && (
          <Box className="flex flex-shrink-0 items-center justify-end bg-gray-200">
            <div className="ml-2 flex-1 text-sm">
              {`${props.parentUiSchema?.["ui:title"]}-${props.index + 1}`}
            </div>
            <ArrayFieldItemButtonsTemplate
              {...buttonsProps}
              style={{ paddingLeft: 6, paddingRight: 6, minWidth: 0 }}
            />
          </Box>
        )}
        <Box className="px-4">{children}</Box>
      </Paper>
    </Box>
  );
}
