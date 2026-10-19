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
        "relative h-full overflow-auto border border-gray-300 print:border-0",
        className,
      )}
    >
      <Typography
        variant="subtitle1"
        className="absolute z-1 bg-gray-200/75 px-2 text-sm print:hidden"
      >
        {title}
      </Typography>

      <div className="overflow-scroll">{children}</div>
    </div>
  );
}
