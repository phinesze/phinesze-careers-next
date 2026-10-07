"use client";

import { CareerEnvironment } from "@/types/CareerEnvironment";

export default function EnvironmentLabel({
  element,
}: {
  element: CareerEnvironment;
}) {
  return (
    <>
      {/* 言語・フレームワーク名 */}
      <span>{element.name}</span>
      {/* バージョン情報 */}
      {element.version && (
        <span className={"ml-[1mm] text-gray-500 italic"}>
          (v{element.version})
        </span>
      )}
    </>
  );
}
