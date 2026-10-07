import { useAtom } from "jotai/index";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CareerHistory } from "@/types/CareerHistory";

import { atom } from "jotai";

export const careerHistoryAtom = atom<CareerHistory>({
  updatedAt: "",
  sections: [],
});

export const useCareerHistoryState = () => {
  const [careerHistory, setCareerHistory] = useAtom(careerHistoryAtom);
  const { sections: careerHistorySections, updatedAt } = careerHistory;

  const searchParams = useSearchParams();

  const isSecrets = useMemo(() => {
    return Boolean(searchParams.get("is_secrets"));
  }, [searchParams]);

  return {
    careerHistory,
    setCareerHistory,
    careerHistorySections,
    updatedAt,
    isSecrets,
  };
};
