import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="bg-white not-print:pt-[8mm]">
      <h1 className="text-[3mm]/[4mm] font-bold">
        Careers 職務経歴書表示用システム
      </h1>
      <Link href="/preview">
        <button
          type="button"
          className="rounded-8 inline-block bg-blue-500 p-[2mm] text-white"
        >
          プレビューページへ移動
        </button>
      </Link>
    </div>
  );
}
