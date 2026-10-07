import { useAtom } from "jotai/index";
import {
  loadedCareerTableSectionsAtom,
  updatedAtAtom,
} from "@/composables/useCareerSections";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export const useCareerTableSectionState = () => {
  const [loadedCareerTableSections, setLoadedCareerTableSections] = useAtom(
    loadedCareerTableSectionsAtom,
  );
  const [updatedAt, setUpdatedAt] = useAtom(updatedAtAtom);

  const searchParams = useSearchParams();

  const isSecrets = useMemo(() => {
    return Boolean(searchParams.get("is_secrets"));
  }, [searchParams]);

  return {
    loadedCareerTableSections,
    setLoadedCareerTableSections,
    updatedAt,
    setUpdatedAt,
    isSecrets,
  };
};
