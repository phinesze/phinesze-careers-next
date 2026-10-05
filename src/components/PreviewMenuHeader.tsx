"use client";

import { useCareerTableSections } from "@/composables/useCareerTableSections";

export default function PreviewMenuHeader() {
  const { handleSelectFile } = useCareerTableSections();

  const handlePrint = () => print();

  return (
    <header className="flex h-9 w-full cursor-pointer bg-gray-400 shadow-lg shadow-indigo-500/50 print:hidden">
      <button className="relative inline-block border border-gray-200 px-2 text-sm">
        <span>biographyData JSONファイル選択</span>
        <input
          type="file"
          accept="application/json"
          className="absolute top-0 left-0 h-full w-full cursor-pointer bg-amber-300 opacity-0"
          onChange={(event) => handleSelectFile(event)}
        />
      </button>
      <button
        className="inline-block cursor-pointer border border-gray-200 px-2 text-sm"
        onClick={handlePrint}
      >
        印刷
      </button>
    </header>
  );
}
