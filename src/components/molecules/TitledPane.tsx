import { Typography } from "@mui/material";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type Props = {
  /** ペイン左上に表示するタイトル */
  title: string;
  /** ルート要素に追加するクラス */
  className?: string;
  children: ReactNode;
};

/** タイトル付きのスクロール可能なペイン */
export function TitledPane({ title, className, children }: Props) {
  return (
    <div
      className={cn(
        "h-full border border-gray-300 not-print:overflow-auto print:border-0",
        className,
      )}
    >
      <Typography
        variant="subtitle1"
        className="absolute z-1 bg-gray-200/75 px-2 text-sm text-black print:hidden"
      >
        {title}
      </Typography>
      <div>{children}</div>
    </div>
  );
}
