import { useAtom } from "jotai/index";
import {
  loadedCareerSectionsAtom,
  updatedAtAtom,
} from "@/composables/useCareerSections";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export const useCareerSectionState = () => {
  const [loadedCareerSections, setLoadedCareerSections] = useAtom(
    loadedCareerSectionsAtom,
  );
  const [updatedAt, setUpdatedAt] = useAtom(updatedAtAtom);

  const searchParams = useSearchParams();

  const isSecrets = useMemo(() => {
    return Boolean(searchParams.get("is_secrets"));
  }, [searchParams]);

  return {
    loadedCareerSections,
    setLoadedCareerSections,
    updatedAt,
    setUpdatedAt,
    isSecrets,
  };
};
