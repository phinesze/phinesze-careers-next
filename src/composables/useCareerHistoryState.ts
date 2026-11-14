import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { CareerHistory } from "@/types/CareerHistory";

const defaultCareerHistory: CareerHistory = {
  updatedAt: "",
  sections: [],
};

/**
 * 職務経歴データのatom（編集画面とプレビューで共有する）
 */
const careerHistoryAtom = atom<CareerHistory>(defaultCareerHistory);

/**
 * 読み込み、新規作成後に職務経歴データを変更したかどうかの値のatom
 */
const isChangedAtom = atom<boolean>(false);

/**
 * 「保存」時の保存先ファイルのハンドル（「開く」「名前をつけて保存」で選んだファイル）
 */
const currentFileHandleAtom = atom<FileSystemFileHandle | undefined>(undefined);

/**
 * 機密要素を表示するか
 */
const isSecretsAtom = atom<boolean>(false);

/**
 * 職務経歴データを読むだけの場合（プレビューなど）
 */
export const useCareerHistoryValue = () => useAtomValue(careerHistoryAtom);

/**
 * 編集フォーム用。データを変更したら必ず「変更あり」にする
 */
export const useEditCareerHistory = () => {
  const [careerHistory, setCareerHistory] = useAtom(careerHistoryAtom);
  const setIsChanged = useSetAtom(isChangedAtom);

  const updateCareerHistory = (data: CareerHistory) => {
    setCareerHistory(data);
    setIsChanged(true);
  };

  const resetCareerHistory = () => {
    setCareerHistory(defaultCareerHistory);
    setIsChanged(false);
  };

  return { careerHistory, updateCareerHistory, resetCareerHistory };
};

/**
 * ファイル入出力用。データ・変更有無・保存先ファイルをまとめて整合させる
 */
export const useCareerHistoryFileState = () => {
  const [careerHistory, setCareerHistory] = useAtom(careerHistoryAtom);
  const [isChanged, setIsChanged] = useAtom(isChangedAtom);
  const [currentFileHandle, setCurrentFileHandle] = useAtom(
    currentFileHandleAtom,
  );

  /**
   * 新規作成: データを空にし、既存ファイルに上書きしないよう保存先もクリアする
   */
  const resetCareerHistory = () => {
    setCareerHistory(defaultCareerHistory);
    setIsChanged(false);
    setCurrentFileHandle(undefined);
  };

  /**
   * 読み込み: 読み込んだデータを反映し、読み込み元のファイルを保存先にする
   */
  const loadCareerHistory = (
    data: CareerHistory,
    fileHandle?: FileSystemFileHandle,
  ) => {
    setCareerHistory(data);
    setIsChanged(false);
    setCurrentFileHandle(fileHandle);
  };

  /**
   * 名前をつけて保存: 以降の「保存」は、ここで選択したファイルに上書きする
   */
  const setSavedFileHandle = (fileHandle: FileSystemFileHandle) => {
    setCurrentFileHandle(fileHandle);
  };

  return {
    careerHistory,
    isChanged,
    currentFileHandle,
    resetCareerHistory,
    loadCareerHistory,
    setSavedFileHandle,
  };
};

/**
 * 機密モードの表示と切り替え用（メニューなど）
 */
export const useIsSecrets = () => {
  const [isSecrets, setIsSecrets] = useAtom(isSecretsAtom);
  const toggleIsSecrets = () => setIsSecrets((prev) => !prev);
  return { isSecrets, toggleIsSecrets };
};

/**
 * 機密モードかどうかを読むだけの場合（プレビューなど）
 */
export const useIsSecretsValue = () => useAtomValue(isSecretsAtom);
