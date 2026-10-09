import { ChangeEvent } from "react";
import { customizeValidator } from "@rjsf/validator-ajv8";
import { RJSFSchema } from "@rjsf/utils";
import { CareerHistory } from "@/types/CareerHistory";
import { useCareerHistoryState } from "@/composables/useCareerHistoryState";
import careerHistorySchema from "@/schemas/CareerHistory.schema.json";

const validator = customizeValidator<CareerHistory>();

export const useCareerHistory = () => {
  const { setCareerHistory, isSecrets } = useCareerHistoryState();

  /**
   * 職務履歴データに合致するかのバリデーションチェック
   */
  const validateCareerHistory = (parsedSectionData: CareerHistory) => {
    const { errors } = validator.validateFormData(
      parsedSectionData as CareerHistory,
      careerHistorySchema as RJSFSchema,
    );
    if (errors.length > 0) {
      alert(
        "職務経歴データの形式と一致しません\n" +
          errors.map((err) => err.stack).join("\n"),
      );
      return false;
    }
    return true;
  };

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
        // 読み込んだファイルをJSONに変換
        const parsedSectionData = JSON.parse(json) as CareerHistory;
        // 職務履歴データに合致するかのバリデーションチェック
        if (!validateCareerHistory(parsedSectionData)) {
          return;
        }
        // 状態管理用のステートに読み込んだJSONの内容を代入
        setCareerHistory(parsedSectionData);
      } catch (e: unknown) {
        // JSON構文エラー
        if (e instanceof SyntaxError) {
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
