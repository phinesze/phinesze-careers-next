"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PreviewIcon from "@mui/icons-material/Preview";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDisplayModeState } from "@/composables/useDisplayModeState";

/**
 * 「表示」メニュー。
 */
export function ViewMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { showEdit, showPreview, toggleShowEdit, toggleShowPreview } =
    useDisplayModeState();

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={openMenu}
        startIcon={<VisibilityIcon />}
        endIcon={<ArrowDropDownIcon />}
        sx={{ padding: "0 8px" }}
      >
        表示
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
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
      </Menu>
    </>
  );
}
