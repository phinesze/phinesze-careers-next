"use client";

import MarkdownDocument from "@/components/atoms/MarkdownDocument";

type Props = {
  label: string;
  markdownText?: string;
}

export default function CareerSectionDocumentBody({ label, markdownText } : Props) {
  return <section className={'[&:not(:first-child)]:border-t [&:not(:last-child)]:border-b'}>
    {/* タイトル */}
    <div v-if="label" className={"font-bold bg-gray-300 p-2"}>
      {　label }
    </div>
    {/* 本文 */}
    <div className={'p-4'}>
      <MarkdownDocument markdownText={markdownText} />
    </div>
  </section>
}