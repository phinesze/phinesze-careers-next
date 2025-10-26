"use client";

import { useMemo } from "react";

export default function DateLabel({ value }: Readonly<{ value?: string }>) {

  const toDateString = useMemo(() => {
    if (value) {
      const [year, month, day] = value.split("-");
      return `${Number(year)}年${Number(month)}月${
        day ? Number(day) + "日" : ""
      }`;
    } else {
      return null;
    }
  }, [value])


  return <span>{ toDateString }</span>
}
