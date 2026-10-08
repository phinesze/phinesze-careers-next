"use client";

import { useMemo } from "react";

export default function ProjectTeamNumberLabel({
  value,
}: {
  value: [number, number?];
}) {
  const teamNumberStr = useMemo(
    () => (value[1] === undefined ? `${value[0]}` : `${value[0]}~${value[1]}`),
    [value],
  );

  return <span>{teamNumberStr}人</span>;
}
