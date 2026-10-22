"use strict";

import { ChangeEvent, useState } from "react";
import { customizeValidator } from "@rjsf/validator-ajv8";
import { RJSFSchema } from "@rjsf/utils";
import { CareerHistory } from "@/types/CareerHistory";
import { useCareerHistoryState } from "@/composables/useCareerHistoryState";
import careerHistorySchema from "@/schemas/CareerHistory.schema.json";

/**
 * window.showSaveFilePickerの型チェックが通るように実装する
 * https://developer.mozilla.org/ja/docs/Web/API/Window/showSaveFilePicker)
 */
declare global {
  interface Window {
    showOpenFilePicker(options?: {
      multiple?: boolean;
      excludeAcceptAllOption?: boolean;
      startIn?:
        | FileSystemHandle
        | "desktop"
        | "documents"
        | "downloads"
        | "music"
        | "pictures"
        | "videos";
      types?: { description?: string; accept: Record<string, string[]> }[];
    }): Promise<FileSystemFileHandle[]>;
    showSaveFilePicker(options?: {
      suggestedName?: string;
      startIn?:
        | FileSystemHandle
        | "desktop"
        | "documents"
        | "downloads"
        | "music"
        | "pictures"
        | "videos";
      types?: { description?: string; accept: Record<string, string[]> }[];
    }): Promise<FileSystemFileHandle>;
  }
}

const validator = customizeValidator<CareerHistory>();

export const useCareerHistory = () => {
  const { careerHistory, setCareerHistory, isSecrets } =
    useCareerHistoryState();

  const [fileHandle, sefFileHandle] = useState<
    FileSystemFileHandle | undefined
  >(undefined);

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
   * 「ファイル」→「開く」を選択した時の動作
   * showOpenFilePickerを使用してファイル選択ダイアログを開く。
   * 非対応の場合はfallbackでinput[type=file]要素のクリック処理を行い同様のダイアログを開く。
   */
  const handleOpenFile = async (fallback: () => void) => {
    // handleOpenFile showOpenFilePicker非対応の時はfallback()でinput要素のclickを行う
    if (!("showOpenFilePicker" in window)) {
      console.log(
        "handleOpenFile showOpenFilePicker非対応の時はfallback()でinput要素のclickを行う",
      );
      fallback();
      return;
    }
    console.log("handleOpenFile showOpenFilePicker対応時");
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        multiple: false,
        types: [{ accept: { "application/json": [".json"] } }],
      });
      sefFileHandle(fileHandle);
      readFile(await fileHandle.getFile());
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        console.log("ユーザーがファイル選択をキャンセルしました。");
      } else {
        console.error("エラーが発生しました:", err);
      }
    }
  };

  /**
   * showOpenFilePicker非対応時に「ファイル」→「開く」を選択してファイルがダイアログで選択された後の動作
   */
  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      readFile(file);
    }
    // 同じファイルを再度選択してもonChangeが発火するようにリセットする
    event.target.value = "";
  };

  /**
   * 選択されたファイルを読み込み、職務経歴データとしてステートに反映する
   */
  const readFile = (file: File) => {
    const reader = new FileReader();
    const ext = file.name.split(".").pop()?.toLowerCase();

    if (ext && !["json"].includes(ext)) {
      alert("読み込めるのはJSON形式のファイルのみです。");
    }

    reader.onload = (e) => {
      const json = e.target?.result;
      if (typeof json !== "string") {
        alert("ファイルを読み込めませんでした。");
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
          alert(`JSONの形式が正しくありません。\n${e.message}`);
          return;
        }
        console.error(e);
        alert("予期しないエラーが発生しました。");
      }
    };
    reader.readAsText(file);
  };

  /**
   * ファイル保存を選択した時の動作
   */
  const handleSaveFile = async () => {
    console.log("handleSaveFile");

    // showSaveFilePickerに対応している場合はファイル保存ダイアログを表示する。非対応の場合はaタグを生成してダウンロードさせる。
    if ("showSaveFilePicker" in window) {
      await saveFileWithShowSaveFilePicker();
    } else {
      return downloadFile();
    }
  };

  /**
   * showSaveFilePickerに非対応の場合の処理としてaタグを生成してファイルをダウンロードさせる。
   */
  function downloadFile() {
    const fileNameWithJson = `careerHistory.json`;
    // データを書き込む
    const careerHistoryStr = JSON.stringify(careerHistory);

    const blobData = new Blob([careerHistoryStr], {
      type: "text/json",
    });

    // aタグを生成してダウンロードさせる
    const url = URL.createObjectURL(blobData);
    const anchorElem = document.createElement("a");
    anchorElem.href = url;
    anchorElem.download = fileNameWithJson;
    anchorElem.click();
    URL.revokeObjectURL(url);
    return;
  }

  /**
   * saveWithShowSaveFilePickerを使用してファイル保存ダイアログを開き職務経歴ファイルを保存する。
   */
  const saveFileWithShowSaveFilePicker = async () => {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: "careerHistory.json",
        startIn: "downloads",
        types: [
          {
            accept: {
              "text/json": [".json"],
            },
          },
        ],
      });

      //　書き込み用のストリームを作成
      const writable = await handle.createWritable();

      // データを書き込む
      const careerHistoryStr = JSON.stringify(careerHistory);
      await writable.write(careerHistoryStr);

      // ストリームを閉じる
      await writable.close();

      alert("ファイルを保存しました。");
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "name" in err &&
        err?.name === "AbortError"
      ) {
        console.log("ユーザーが保存をキャンセルしました。");
      } else {
        console.error("エラーが発生しました:", err);
      }
    }
  };
  return {
    isSecrets,
    handleOpenFile,
    handleSelectFile,
    handleSaveFile,
  };
};
