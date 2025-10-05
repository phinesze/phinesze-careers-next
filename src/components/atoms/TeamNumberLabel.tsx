"use client";

import { useMemo } from "react";

export default function TeamNumberLabel({value} : { value: number | [number, number] }) {

  const teamNumberStr = useMemo(() =>
    Array.isArray(value)
      ? `${value[0]}~${value[1]}`
      : `${value}`
  , [value]);

  return <span>{teamNumberStr}人</span>
}
