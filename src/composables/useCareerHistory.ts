import { ChangeEvent } from "react";
import { CareerHistory } from "@/types/CareerHistory";
import { useCareerHistoryState } from "@/composables/useCareerHistoryState";

export const useCareerHistory = () => {
  const { setCareerHistory, isSecrets } = useCareerHistoryState();

  /**
   * ファイル読み込みを選択した時の動作
   */
  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    const ext = file.name.split(".").pop()?.toLowerCase();

    if (ext && !["json"].includes(ext)) {
      alert("読み込み可能なファイルはjson形式のみです");
    }

    reader.onload = (e) => {
      const json = e.target?.result;
      if (typeof json !== "string") {
        alert("error");
        return;
      }

      try {
        const parsedSectionData = JSON.parse(json) as CareerHistory;
        setCareerHistory(parsedSectionData);
      } catch (e: unknown) {
        // JSON構文エラー
        if (e instanceof SyntaxError) {
          console.error("JSON parse error:", e.message);
          alert(`JSONの形式が正しくありません\n${e.message}`);
          return;
        }
        console.error(e);
        alert("予期しないエラーが発生しました");
      }
    };
    reader.readAsText(file);
  };
  return {
    isSecrets,
    handleSelectFile,
  };
};
