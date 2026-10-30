"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const muiTheme = createTheme({
  typography: { fontSize: 12 },
  // theme.spacing(1) の単位 (デフォルト 8px)。Grid の spacing や Paper/Box の padding がまとめて縮む
  spacing: 2,
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        // 入力欄内側の余白 (size="small" のデフォルトは 8.5px 14px)
        input: { padding: "6px 6px" },
      },
    },
    MuiTextField: { defaultProps: { size: "small", margin: "dense" } },
    MuiFormControl: { defaultProps: { size: "small", margin: "dense" } },
    MuiSelect: { defaultProps: { size: "small" } },
    MuiCheckbox: { defaultProps: { size: "small" } },
    MuiButton: { defaultProps: { size: "small" } },
    MuiIconButton: { defaultProps: { size: "small" } },
  },
  // OS のカラースキーム (prefers-color-scheme) に追従してライト/ダークを切り替える
  colorSchemes: { light: true, dark: true },
});

export function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
