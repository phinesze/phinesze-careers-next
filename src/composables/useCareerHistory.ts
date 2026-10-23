"use strict";

import { useState } from "react";
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

  // showOpenFilePicker、showSaveFilePickerに対応しているか
  const isEnableFilePicker =
    "showOpenFilePicker" in window && "showSaveFilePicker" in window;

  // showOpenFilePickerの対応時に上書き保存ようにfileHnadleを記憶する
  const [fileHandle, setFileHandle] = useState<
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
   * showOpenFilePickerを使用してファイル選択ダイアログを開く（showOpenFilePickerに対応の場合）。
   * 非対応の場合はfallbackでinput[type=file]要素を生成してクリック処理を行い同様のダイアログを開く。
   */
  const handleOpenFile = async () => {
    if (isEnableFilePicker) {
      // showOpenFilePickerに対応の場合の処理
      try {
        // ファイル選択ダイアログを開き、選択後に選択したファイルのハンドルを取得する。
        const [handle] = await window.showOpenFilePicker({
          multiple: false,
          types: [{ accept: { "application/json": [".json"] } }],
        });
        readFile(await handle.getFile());

        // showOpenFilePickerfileHandleを上書き保存時のために保持する。
        setFileHandle(handle);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          console.log("ユーザーがファイル選択をキャンセルしました。");
        } else {
          console.error("エラーが発生しました:", err);
        }
      }
    } else {
      // showOpenFilePickerに対応していない場合の処理
      const fileInput = Object.assign(document.createElement("input"), {
        type: "file",
        accept: "application/json",
        onchange: () => {
          const file = fileInput.files?.[0];
          if (file) {
            readFile(file);
          }
        },
      });
      fileInput.click();
    }
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
   * 「ファイル」→「名前をつけて保存」を選択した時の動作
   * ファイル保存ダイアログを開き職務経歴ファイルを保存する（showSaveFilePickerに対応の場合）。
   */
  const handleSaveFileAs = async () => {
    const selectedFileHandle = await window.showSaveFilePicker({
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

    saveByFileHandle(selectedFileHandle);
    setFileHandle(selectedFileHandle);
  };

  /**
   * 「ファイル」→「保存」を選択した時の動作
   * file（showSaveFilePickerに対応の場合）。
   */
  const handleSaveFile = async () => {
    if (fileHandle) {
      saveByFileHandle(fileHandle);
    } else {
      handleSaveFileAs();
    }
  };

  const saveByFileHandle = async (handle: FileSystemFileHandle) => {
    //　書き込み用のストリームを作成
    const writable = await handle.createWritable();

    // データを書き込む
    const careerHistoryStr = JSON.stringify(careerHistory);
    await writable.write(careerHistoryStr);

    // ストリームを閉じる
    await writable.close();

    alert("ファイルを保存しました。");
  };

  /**
   * 「ファイル」→「編集中のデータをダウンロード」を選択した時の動作
   * aタグを生成してファイルをダウンロードさせる（showSaveFilePickerに非対応の場合を想定）。
   */
  function handleDownloadFile() {
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

  return {
    isEnableFilePicker,
    isSecrets,
    handleOpenFile,
    handleSaveFileAs,
    handleSaveFile,
    handleDownloadFile,
  };
};
