import { Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  /** ペイン左上に表示するタイトル */
  title: string;
  children: ReactNode;
};

/** タイトル付きのスクロール可能なペイン */
export function TitledPane({ title, children }: Props) {
  return (
    <div className="overflow-auto border border-gray-300">
      <Typography
        variant="subtitle1"
        className="absolute z-1 bg-gray-200/75 px-2 text-sm"
      >
        {title}
      </Typography>

      <div className="overflow-scroll">{children}</div>
    </div>
  );
}
