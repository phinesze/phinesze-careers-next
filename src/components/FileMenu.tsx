"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DownloadIcon from "@mui/icons-material/Download";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import FolderIcon from "@mui/icons-material/Folder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import {
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useCareerHistory } from "@/composables/useCareerHistory";

/**
 * 「ファイル」メニュー。
 */
export function FileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {
    isEnableFilePicker,
    handleNew,
    handleOpenFile,
    handleSaveFile,
    handleSaveFileAs,
    handleDownloadFile,
  } = useCareerHistory();

  // ショートカットキーを設定
  const handleKeyDown = (event: KeyboardEvent) => {
    const isMod = event.metaKey || event.ctrlKey;
    // Ctrl+O / ⌘+Oでファイルを開く
    if (isMod && event.key.toLowerCase() === "o") {
      event.preventDefault();
      handleOpenFile();
      // Ctrl+S / ⌘+Sで保存する
    } else if (isMod && event.key.toLowerCase() === "s") {
      event.preventDefault();
      handleSaveFile();
    }
  };
  const handleKeyDownRef = useRef(handleKeyDown);
  useEffect(() => {
    handleKeyDownRef.current = handleKeyDown;
  });
  useEffect(() => {
    const listener = (event: KeyboardEvent) => handleKeyDownRef.current(event);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={openMenu}
        startIcon={<FolderIcon />}
        endIcon={<ArrowDropDownIcon />}
        sx={{ padding: "0 8px" }}
      >
        ファイル
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={closeMenu}
        slotProps={{ list: { onClick: closeMenu } }}
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
          <Typography variant="caption">⌘O</Typography>
        </MenuItem>
        {isEnableFilePicker && (
          <>
            <MenuItem onClick={handleSaveFile}>
              <ListItemIcon>
                <SaveIcon fontSize="small" />
              </ListItemIcon>
              <span className="flex-1">保存</span>
              <Typography variant="caption">⌘S</Typography>
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
    </>
  );
}
