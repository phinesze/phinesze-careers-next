"use client";
{
  /* layout/preview.vueに相当するファイル) */
}

import { useCareerTableSections } from "@/composables/useCareerTableSections";

export default function LayoutButtons() {
  const { handleSelectFile } = useCareerTableSections();

  const handlePrint = () => print();

  return (
    <footer className="h-16 w-full bg-gray-400 shadow-lg shadow-indigo-500/50 print:hidden">
      <button className="relative inline-block h-16 border border-gray-200 px-5">
        <span>biographyData JSONファイル選択</span>
        <input
          type="file"
          accept="application/json"
          className="absolute top-0 left-0 h-full w-full bg-amber-300 opacity-0"
          onChange={(event) => handleSelectFile(event)}
        />
      </button>
      <button
        className="inline-block h-16 border border-gray-200 px-5"
        onClick={handlePrint}
      >
        印刷
      </button>
    </footer>
  );
}
