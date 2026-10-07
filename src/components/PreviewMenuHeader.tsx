"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCareerSections } from "@/composables/useCareerSections";
import { cn } from "@/utils/cn";

export default function PreviewMenuHeader() {
  const { handleSelectFile, isSecrets } = useCareerSections();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePrint = () => print();

  const toggleIsSecrets = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isSecrets) {
      params.delete("is_secrets");
    } else {
      params.set("is_secrets", "1");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <header className="flex h-9 w-full cursor-pointer bg-gray-400/50 shadow-lg shadow-indigo-500/50 print:hidden">
      <button className="relative inline-block border border-gray-200 px-2 text-sm">
        <span>biographyData JSONファイル選択</span>
        <input
          type="file"
          accept="application/json"
          className="absolute top-0 left-0 h-full w-full cursor-pointer bg-amber-300 opacity-0"
          onChange={(event) => handleSelectFile(event)}
        />
      </button>
      <button
        className="inline-block cursor-pointer border border-gray-200 px-2 text-sm"
        onClick={handlePrint}
      >
        印刷
      </button>
      <button
        className={cn(
          "inline-block cursor-pointer border border-gray-200 px-2 text-sm",
          isSecrets && "bg-orange-200",
        )}
        onClick={toggleIsSecrets}
      >
        機密表示: {isSecrets ? "あり" : "なし"}
      </button>
    </header>
  );
}
