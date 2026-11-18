"use client";

import { FileMenu } from "@/components/FileMenu";
import { PrintMenu } from "@/components/PrintMenu";
import { ViewMenu } from "@/components/ViewMenu";

export function MenuHeader() {
  return (
    <header className="flex h-8 w-full cursor-pointer bg-gray-400/50 px-2 print:hidden">
      {/* ファイル */}
      <FileMenu />

      {/* 表示 */}
      <ViewMenu />

      {/* 印刷 */}
      <PrintMenu />
    </header>
  );
}
