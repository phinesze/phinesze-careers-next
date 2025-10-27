"use client";

import markdownit from "markdown-it";
import { useMemo } from "react";

const md = markdownit();

type Props = {
  className?: string,
  markdownText?: string
}

export default function MarkdownDocument({ className, markdownText }: Props) {
  const renderedHtml = useMemo(() => {
    return markdownText ? md.render(markdownText) : "";
  }, []);

  return (
    markdownText && <section className={className}>
      <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
    </section>

  );

}