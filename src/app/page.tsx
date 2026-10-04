import Link from "next/link";

export default function IndexPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">Careers 職務経歴書表示用システム</h1>
      <Link href="/preview">
        <button
          type="button"
          className="rounded-8 inline-block bg-blue-500 p-4 text-white"
        >
          プレビューページへ移動
        </button>
      </Link>
    </section>
  );
}
