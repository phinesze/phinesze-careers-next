"use client";

import markdownit from "markdown-it";
import { useMemo } from "react";

const md = markdownit();

type Props = {
  className?: string;
  markdownText?: string;
};

export default function MarkdownDocument({ className, markdownText }: Props) {
  const renderedHtml = useMemo(() => {
    return markdownText ? md.render(markdownText) : "";
  }, [markdownText]);

  return (
    markdownText && (
      <div className={className}>
        <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
      </div>
    )
  );
}
