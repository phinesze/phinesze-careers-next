import { TextField } from "@mui/material";
import { WidgetProps } from "@rjsf/utils";
import { useState } from "react";

/**
 * フォーカスが外れた時に入力値を更新させるための1行または複数行のテキストフィールドのウィジェット
 */
export function TextFieldWidget(props: WidgetProps) {
  const { onChange, value } = props;
  const [inputValue, setInputValue] = useState(value);

  const isMultiline = (props.options.rows ?? 1) >= 2;

  return (
    <TextField
      value={inputValue}
      multiline={isMultiline}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={(e) => onChange(e.target.value || undefined)}
      slotProps={{
        htmlInput: {
          style: {
            resize: "vertical",
          },
        },
      }}
      {...props.options}
    />
  );
}
