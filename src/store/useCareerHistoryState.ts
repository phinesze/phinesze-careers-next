import { atom } from "jotai";
import { CareerHistory } from "@/types/CareerHistory";

/**
 * 職務経歴データの初期値（新規作成時など）
 */
export const defaultCareerHistory: CareerHistory = {
  updatedAt: "",
  sections: [],
};

/**
 * 職務経歴データのatom（編集画面とプレビューで共有する）
 */
export const careerHistoryAtom = atom<CareerHistory>(defaultCareerHistory);

/**
 * 職務経歴データを（読み込みや新規作成の後に）変更したかどうかの値のatom
 */
export const isChangedAtom = atom<boolean>(false);

/**
 * 「保存」を選択した時の保存先ファイルハンドルのatom（「開く」や「名前をつけて保存」で選んだファイル）
 */
export const currentFileHandleAtom = atom<FileSystemFileHandle | undefined>(
  undefined,
);

/**
 * 機密要素を表示するかどうかの値のatom（プレビュー画面で反映される）
 */
export const isSecretsAtom = atom<boolean>(false);

/**
 * 編集画面を表示するかどうかの値のatom（プレビュー画面と同時に非表示にはしない）
 */
export const showEditAtom = atom<boolean>(true);

/**
 * プレビュー画面を表示するかどうかの値のatom（編集画面と同時に非表示にはしない）
 */
export const showPreviewAtom = atom<boolean>(true);
