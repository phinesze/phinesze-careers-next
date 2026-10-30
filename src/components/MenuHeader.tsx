"use client";

import { useEffect, useState } from "react";
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
import EditNoteIcon from "@mui/icons-material/EditNote";
import PreviewIcon from "@mui/icons-material/Preview";
import PrintIcon from "@mui/icons-material/Print";
import LockIcon from "@mui/icons-material/Lock";
import { useCareerHistory } from "@/composables/useCareerHistory";
import { useCareerHistoryState } from "@/composables/useCareerHistoryState";
import { useDisplayModeState } from "@/composables/useDisplayModeState";

// OS のカラースキーム (prefers-color-scheme) に追従してライト/ダークを切り替える
const menuTheme = createTheme({
  colorSchemes: { light: true, dark: true },
});

export function MenuHeader() {
  const [fileAnchorEl, setFileAnchorEl] = useState<null | HTMLElement>(null);
  const [viewAnchorEl, setViewAnchorEl] = useState<null | HTMLElement>(null);
  const [printAnchorEl, setPrintAnchorEl] = useState<null | HTMLElement>(null);
  const {
    isEnableFilePicker,
    handleNew,
    handleOpenFile,
    handleSaveFile,
    handleSaveFileAs,
    handleDownloadFile,
  } = useCareerHistory();
  const { isSecrets, toggleIsSecrets } = useCareerHistoryState();

  const {
    showEdit,
    showPreview,
    setShowEdit,
    setShowPreview,
    toggleShowEdit,
    toggleShowPreview,
  } = useDisplayModeState();

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

  const openPrintMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPrintAnchorEl(event.currentTarget);
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
                <EditNoteIcon fontSize="small" />
              </ListItemIcon>
              <span className="flex-1">編集</span>
              {showEdit && <CheckIcon fontSize="small" className="ml-2" />}
            </MenuItem>

            <MenuItem
              onClick={() => {
                toggleShowPreview();
              }}
            >
              <ListItemIcon>
                <PreviewIcon fontSize="small" />
              </ListItemIcon>
              <span className="flex-1">プレビュー</span>
              {showPreview && <CheckIcon fontSize="small" className="ml-2" />}
            </MenuItem>
          </MenuList>
        </Menu>

        {/* 印刷 */}
        <Button
          color="inherit"
          onClick={openPrintMenu}
          endIcon={<ArrowDropDownIcon />}
        >
          印刷
        </Button>
        <Menu
          anchorEl={printAnchorEl}
          open={!!printAnchorEl}
          onClose={() => setPrintAnchorEl(null)}
        >
          <MenuList>
            <MenuItem
              onClick={() => {
                setPrintAnchorEl(null);
                handlePrintCareer();
              }}
            >
              <ListItemIcon>
                <PrintIcon fontSize="small" />
              </ListItemIcon>
              <span className="flex-1">経歴書を印刷</span>
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => {
                toggleIsSecrets();
              }}
            >
              <ListItemIcon>
                <LockIcon fontSize="small" />
              </ListItemIcon>
              <span className="flex-1">機密要素を表示する</span>
              {isSecrets && <CheckIcon fontSize="small" className="ml-2" />}
            </MenuItem>
          </MenuList>
        </Menu>
      </header>
    </ThemeProvider>
  );
}
