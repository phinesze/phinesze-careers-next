"use client";
{/* layout/preview.vueに相当するファイル) */}

import { ChangeEvent } from "react";

export default function LayoutButtons({
}: Readonly<{}>) {

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {

  }

  const handlePrint = () => print();

  return (
    <footer className="print:hidden fixed left-0 bottom-0 w-full h-16 bg-gray-400 shadow-lg shadow-indigo-500/50">
      <button className="inline-block border border-gray-200 h-16 px-5 relative">
        <span>biographyData JSONファイル選択</span>
        <input
          type="file"
          accept="application/json"
          className="absolute left-0 top-0 w-full h-full bg-amber-300 opacity-0" onChange={handleSelectFile} />
      </button>
      <button
        className="inline-block border border-gray-200 h-16 px-5" onClick={handlePrint}>
      印刷
    </button>
    </footer>)
  ;
}
