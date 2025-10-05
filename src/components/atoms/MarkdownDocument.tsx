"use client";

import markdownit from 'markdown-it'
const md = markdownit();

import { useMemo } from "react";

export default function MarkdownDocument({ label, markdownText } : { label?: string, markdownText?: string }) {


  const renderedHtml = useMemo(() => {
    return markdownText ? md.render(markdownText) : "";
  },[])

  return (
    markdownText && <section>
      <div dangerouslySetInnerHTML={{ __html: markdownText }} />
    </section>

  )

}