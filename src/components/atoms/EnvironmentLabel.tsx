"use client";

import { useMemo } from "react";

type EnvironmentElement = string | [string, { version?: number | string }?];

export default function EnvironmentLabel({
  element,
}: {
  element: EnvironmentElement;
}) {
  const elementName = useMemo(() => {
    return typeof element === "string" ? element : element[0];
  }, [element]);

  const elementOptions = useMemo(() => {
    return typeof element === "string" ? undefined : element[1];
  }, [element]);

  return (
    <div className={"inline-block"}>
      <span>{elementName}</span>
      {elementOptions?.version && (
        <i v-if="elementOptions.version"> {elementOptions.version} </i>
      )}
    </div>
  );
}
