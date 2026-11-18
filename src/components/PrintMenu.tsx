"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import PrintIcon from "@mui/icons-material/Print";
import { Button, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useIsSecrets } from "@/composables/useCareerHistoryState";
import { useDisplayModeState } from "@/composables/useDisplayModeState";

/**
 * 「印刷」メニュー。
 */
export function PrintMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isSecrets, toggleIsSecrets } = useIsSecrets();
  const { showPreviewOnly } = useDisplayModeState();

  /**
   * 経歴書を印刷させるため、プレビューのみ表示させた上に印刷を開く。
   */
  const handlePrintCareer = () => {
    showPreviewOnly();
    setTimeout(() => {
      print();
    }, 0);
  };

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={openMenu}
        startIcon={<PrintIcon />}
        endIcon={<ArrowDropDownIcon />}
        sx={{ padding: "0 8px" }}
      >
        印刷
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
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
      </Menu>
    </>
  );
}
