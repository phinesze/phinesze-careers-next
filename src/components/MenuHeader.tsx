"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DownloadIcon from "@mui/icons-material/Download";
import { useCareerHistory } from "@/composables/useCareerHistory";
import { useDisplayModeState } from "@/composables/useDisplayModeState";

// OS のカラースキーム (prefers-color-scheme) に追従してライト/ダークを切り替える
const menuTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: { colorSchemeSelector: "media" },
});

export function MenuHeader() {
  const [fileAnchorEl, setFileAnchorEl] = useState<null | HTMLElement>(null);
  const [viewAnchorEl, setViewAnchorEl] = useState<null | HTMLElement>(null);
  const {
    isEnableFilePicker,
    handleNew,
    handleOpenFile,
    handleSaveFile,
    handleSaveFileAs,
    handleDownloadFile,
    isSecrets,
  } = useCareerHistory();

  const {
    showEdit,
    showPreview,
    setShowEdit,
    setShowPreview,
    toggleShowEdit,
    toggleShowPreview,
  } = useDisplayModeState();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * 経歴書を印刷させるため、プレビューのみ表示させた上に印刷を開く。
   */
  const handlePrintCareer = () => {
    setShowEdit(false);
    setShowPreview(true);
    setTimeout(() => {
      print();
    }, 0);
  };

  const toggleIsSecrets = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isSecrets) {
      params.delete("is_secrets");
    } else {
      params.set("is_secrets", "1");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  // ショートカットキーを設定
  const handleKeyDown = (event: KeyboardEvent) => {
    const isMod = event.metaKey || event.ctrlKey;
    // Ctrl+O / ⌘+Oで新規作成する
    if (isMod && event.key.toLowerCase() === "o") {
      event.preventDefault();
      handleOpenFile();
      // Ctrl+S / ⌘+Sで保存するする
    } else if (isMod && isMod && event.key.toLowerCase() === "s") {
      event.preventDefault();
      handleSaveFile();
    }
  };
  window.addEventListener("keydown", handleKeyDown);

  const openFileMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFileAnchorEl(event.currentTarget);
  };

  const closeFileMenu = () => {
    setFileAnchorEl(null);
  };

  const openViewMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setViewAnchorEl(event.currentTarget);
  };

  return (
    <ThemeProvider theme={menuTheme}>
      <header className="flex h-9 w-full cursor-pointer bg-gray-400/50 print:hidden">
        {/* ファイル */}
        <Button
          color="inherit"
          onClick={openFileMenu}
          endIcon={<ArrowDropDownIcon />}
        >
          ファイル
        </Button>
        <Menu
          anchorEl={fileAnchorEl}
          open={!!fileAnchorEl}
          onClose={closeFileMenu}
          slotProps={{ list: { onClick: closeFileMenu } }}
        >
          <MenuItem onClick={handleNew}>
            <ListItemIcon>
              <NoteAddIcon fontSize="small" />
            </ListItemIcon>
            <span className="flex-1">新規作成</span>
          </MenuItem>
          <MenuItem onClick={handleOpenFile}>
            <ListItemIcon>
              <FileOpenIcon fontSize="small" />
            </ListItemIcon>
            <span className="flex-1">開く</span>
            <Typography variant="body2">⌘O</Typography>
          </MenuItem>
          {isEnableFilePicker && (
            <>
              <MenuItem onClick={handleSaveFile}>
                <ListItemIcon>
                  <SaveIcon fontSize="small" />
                </ListItemIcon>
                <span className="flex-1">保存</span>
                <Typography variant="body2">⌘S</Typography>
              </MenuItem>
              <MenuItem onClick={handleSaveFileAs}>
                <ListItemIcon>
                  <SaveAsIcon fontSize="small" />
                </ListItemIcon>
                <span className="flex-1">名前をつけて保存</span>
              </MenuItem>
            </>
          )}
          <MenuItem onClick={handleDownloadFile}>
            <ListItemIcon>
              <DownloadIcon fontSize="small" />
            </ListItemIcon>{" "}
            <span className="flex-1"> 編集中のデータをダウンロード</span>
          </MenuItem>
        </Menu>

        {/* 表示 */}
        <Button
          color="inherit"
          onClick={openViewMenu}
          endIcon={<ArrowDropDownIcon />}
        >
          表示
        </Button>
        <Menu
          anchorEl={viewAnchorEl}
          open={!!viewAnchorEl}
          onClose={() => setViewAnchorEl(null)}
        >
          <MenuList>
            <MenuItem
              onClick={() => {
                toggleShowEdit();
              }}
            >
              <ListItemIcon>
                {showEdit ? <CheckIcon fontSize="small" /> : null}
              </ListItemIcon>
              編集
            </MenuItem>

            <MenuItem
              onClick={() => {
                toggleShowPreview();
              }}
            >
              <ListItemIcon>
                {showPreview ? <CheckIcon fontSize="small" /> : null}
              </ListItemIcon>
              プレビュー
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => {
                toggleIsSecrets();
              }}
            >
              <ListItemIcon>
                {isSecrets ? <CheckIcon fontSize="small" /> : null}
              </ListItemIcon>
              機密要素を表示する
            </MenuItem>
          </MenuList>
        </Menu>
        <Button color="inherit" onClick={handlePrintCareer}>
          経歴書を印刷
        </Button>
      </header>
    </ThemeProvider>
  );
}
