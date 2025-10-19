"use client";

type Props = {
  label: string;
  markdownText?: string;
}

export default function CareerSectionDocumentBody({ label, markdownText } : Props) {
  return <section className={'[&:not(:first-child)]:border-t [&:not(:last-child)]:border-b'}>
    CareerSectionDocumentBody
  </section>
}