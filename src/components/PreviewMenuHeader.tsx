"use client";

import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@mui/material";
import { useCareerHistory } from "@/composables/useCareerHistory";
import { useDisplayModeState } from "@/composables/useDisplayModeState";
import { cn } from "@/utils/cn";

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
      <Button
        className={cn(showEdit && "bg-orange-200")}
        onClick={() => {
          toggleShowEdit();
        }}
      >
        エディターを表示／非表示
      </Button>
      <Button
        className={cn(showPreview && "bg-orange-200")}
        onClick={() => {
          toggleShowPreview();
        }}
      >
        プレビューを表示／非表示
      </Button>
      <Button onClick={handlePrintCareer}>経歴書を印刷</Button>
      <Button
        className={cn(isSecrets && "bg-orange-200")}
        onClick={toggleIsSecrets}
      >
        機密表示: {isSecrets ? "あり" : "なし"}
      </Button>
    </header>
  );
}
