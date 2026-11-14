import { atom } from "jotai";
import { CareerHistory } from "@/types/CareerHistory";

export const defaultCareerHistory: CareerHistory = {
  updatedAt: "",
  sections: [],
};

/**
 * 職務経歴データ（編集画面とプレビューで共有する）
 */
export const careerHistoryAtom = atom<CareerHistory>(defaultCareerHistory);

/**
 * 読み込み、新規作成後に職務経歴データを変更したかどうかの値
 */
export const isChangedAtom = atom<boolean>(false);

/**
 * 「保存」時の保存先ファイルのハンドル（「開く」「名前をつけて保存」で選んだファイル）
 */
export const currentFileHandleAtom = atom<FileSystemFileHandle | undefined>(
  undefined,
);

/**
 * 機密要素を表示するか
 */
export const isSecretsAtom = atom<boolean>(false);
