import { atom } from "jotai";
import { useAtom } from "jotai/index";
import { CareerHistory } from "@/types/CareerHistory";

export const defaultCareerHistory = {
  updatedAt: "",
  sections: [],
};

export const careerHistoryAtom = atom<CareerHistory>(defaultCareerHistory);

/**
 * 読み込み、新規作成後に
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

/**
 * 職務経歴データを保持するためのステートやjotai
 */
export const useCareerHistoryState = () => {
  const [careerHistory, setCareerHistory] = useAtom(careerHistoryAtom);
  const [isChanged, setIsChanged] = useAtom(isChangedAtom);
  const [currentFileHandle, setCurrentFileHandle] = useAtom(
    currentFileHandleAtom,
  );
  const { sections: careerHistorySections, updatedAt } = careerHistory;

  const [isSecrets, setIsSecrets] = useAtom(isSecretsAtom);

  const resetCareerHistory = () => {
    setCareerHistory({
      updatedAt: "",
      sections: [],
    });
    setIsChanged(false);
  };

  const toggleIsSecrets = () => {
    setIsSecrets((prev) => !prev);
  };

  return {
    careerHistory,
    setCareerHistory,
    resetCareerHistory,
    isChanged,
    setIsChanged,
    currentFileHandle,
    setCurrentFileHandle,
    careerHistorySections,
    updatedAt,
    isSecrets,
    setIsSecrets,
    toggleIsSecrets,
  };
};
