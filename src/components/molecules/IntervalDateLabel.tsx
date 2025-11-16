"use client";

import DateLabel from "@/components/atoms/DateLabel";
import { useMemo } from "react";

type Props = {
  value?: {
    start: string;
    end?: string;
  };
};

export default function IntervalDateLabel({ value }: Props) {
  const months = useMemo(() => {
    const getMonthNum = (date: Date) =>
      date.getFullYear() * 12 + date.getMonth();

    if (!value.end) {
      return null;
    }
    const startDate = new Date(value.start);
    const endDate = new Date(value.end);
    return 1 + getMonthNum(endDate) - getMonthNum(startDate);
  }, [value]);

  const yearCount = useMemo(
    () => (months ? Math.floor(months / 12) : null),
    [months],
  );

  return value ? (
    <div>
      <DateLabel value={value.start} />
      〜
      <DateLabel value={value.end} />
      {months ? (
        <div v-if="months">
          <span>
            （{yearCount ? `${yearCount}年` : ""}
            {`${months % 12}ヶ月`}）
          </span>
          <span></span>
        </div>
      ) : (
        <div>(進行中)</div>
      )}
    </div>
  ) : (
    ""
  );
}
