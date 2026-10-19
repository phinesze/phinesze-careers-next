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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openViewMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeViewMenu = () => {
    setAnchorEl(null);
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
      <Button onClick={() => fileInputRef.current?.click()}>
        <span>ファイルを開く</span>
      </Button>
      <Button>
        <span>ファイルを保存</span>
        <button
          className="absolute top-0 left-0 h-full w-full cursor-pointer bg-amber-300 opacity-0"
          onClick={() => handleSaveFile()}
        />
      </Button>
      <Button onClick={handlePrintCareer}>経歴書を印刷</Button>

      <Button onClick={openViewMenu} endIcon={<ArrowDropDown />}>
        表示
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeViewMenu}>
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
    </header>
  );
}
