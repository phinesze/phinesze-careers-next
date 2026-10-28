import { useAtom } from "jotai/index";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CareerHistory } from "@/types/CareerHistory";

import { atom } from "jotai";

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
 * 職務経歴データを保持するためのステートやjotai
 */
export const useCareerHistoryState = () => {
  const [careerHistory, setCareerHistory] = useAtom(careerHistoryAtom);
  const [isChanged, setIsChanged] = useAtom(isChangedAtom);
  const { sections: careerHistorySections, updatedAt } = careerHistory;

  const searchParams = useSearchParams();

  const resetCareerHistory = () => {
    setCareerHistory({
      updatedAt: "",
      sections: [],
    });
    setIsChanged(false);
  };

  const isSecrets = useMemo(() => {
    return Boolean(searchParams.get("is_secrets"));
  }, [searchParams]);

  return {
    careerHistory,
    setCareerHistory,
    resetCareerHistory,
    isChanged,
    setIsChanged,
    careerHistorySections,
    updatedAt,
    isSecrets,
  };
};
