import { WidgetProps } from "@rjsf/utils";
import { Box, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

type Mode = "month" | "date";

/**
 * 月まで（YYYY-MM）と日まで（YYYY-MM-DD）を切り替えて入力できるウィジェット
 */
export function MonthOrDateWidget({
  id,
  value,
  label,
  required,
  disabled,
  readonly,
  rawErrors,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps) {
  // 値が空のときに選んだモード
  const [emptyMode, setEmptyMode] = useState<Mode>("month");

  // 値があるときは値の長さで現在のモードを判定する
  const mode: Mode = value
    ? String(value).length > 7
      ? "date"
      : "month"
    : emptyMode;

  const handleModeChange = (next: Mode | null) => {
    if (!next || next === mode) {
      return;
    }
    if (!value) {
      setEmptyMode(next);
      return;
    }
    // 日→月は日を切り捨て、月→日は1日を補う
    onChange(next === "month" ? value.slice(0, 7) : `${value.slice(0, 7)}-01`);
  };

  return (
    <Box className="flex items-center gap-2">
      <ToggleButtonGroup
        value={mode}
        exclusive
        size="small"
        disabled={disabled || readonly}
        onChange={(_, next: Mode | null) => handleModeChange(next)}
      >
        <ToggleButton value="month">月</ToggleButton>
        <ToggleButton value="date">日</ToggleButton>
      </ToggleButtonGroup>
      <TextField
        id={id}
        type={mode}
        label={label}
        value={value ?? ""}
        required={required}
        disabled={disabled}
        error={!!rawErrors?.length}
        fullWidth
        slotProps={{
          inputLabel: { shrink: true },
          htmlInput: { readOnly: readonly },
        }}
        onChange={(e) => onChange(e.target.value || undefined)}
        onBlur={(e) => onBlur(id, e.target.value)}
        onFocus={(e) => onFocus(id, e.target.value)}
      />
    </Box>
  );
}
