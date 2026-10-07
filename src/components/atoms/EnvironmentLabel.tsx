"use client";

import { CareerEnvironment } from "@/types/CareerEnvironment";

export default function EnvironmentLabel({
  element,
}: {
  element: CareerEnvironment;
}) {
  const [elementName, elementOptions] = Array.isArray(element)
    ? element
    : [element, undefined];
  return (
    <>
      {/* 言語・フレームワーク名 */}
      <span>{elementName}</span>
      {/* バージョン情報 */}
      {elementOptions?.version && (
        <span className={"ml-[1mm] text-gray-500 italic"}>
          (v{elementOptions.version})
        </span>
      )}
    </>
  );
}
