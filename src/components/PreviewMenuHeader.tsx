"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Check from "@mui/icons-material/Check";
import { useCareerHistory } from "@/composables/useCareerHistory";
import { useDisplayModeState } from "@/composables/useDisplayModeState";

export function PreviewMenuHeader() {
  const [fileAnchorEl, setFileAnchorEl] = useState<null | HTMLElement>(null);
  const [viewAnchorEl, setViewAnchorEl] = useState<null | HTMLElement>(null);
  const { handleSelectFile, handleSaveFile, isSecrets } = useCareerHistory();

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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <header className="flex h-9 w-full cursor-pointer bg-gray-400/50 print:hidden">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(event) => handleSelectFile(event)}
      />
      <Button onClick={openFileMenu} endIcon={<ArrowDropDown />}>
        ファイル
      </Button>
      <Menu
        anchorEl={fileAnchorEl}
        open={!!fileAnchorEl}
        onClose={closeFileMenu}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              closeFileMenu();
              fileInputRef.current?.click();
            }}
          >
            開く
          </MenuItem>
          <MenuItem
            onClick={() => {
              closeFileMenu();
              handleSaveFile();
            }}
          >
            保存
          </MenuItem>
        </MenuList>
      </Menu>
      <Button onClick={openViewMenu} endIcon={<ArrowDropDown />}>
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
              {showEdit ? <Check fontSize="small" /> : null}
            </ListItemIcon>
            編集
          </MenuItem>

          <MenuItem
            onClick={() => {
              toggleShowPreview();
            }}
          >
            <ListItemIcon>
              {showPreview ? <Check fontSize="small" /> : null}
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
              {isSecrets ? <Check fontSize="small" /> : null}
            </ListItemIcon>
            プレビューを機密要素ありにする
          </MenuItem>
        </MenuList>
      </Menu>
      <Button onClick={handlePrintCareer}>経歴書を印刷</Button>
    </header>
  );
}
