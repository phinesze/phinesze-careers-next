import { useAtom } from "jotai/index";
import {
  loadedCareerTableSectionsAtom,
  updatedAtAtom,
} from "@/composables/useCareerTableSections";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export const useCareerTableSectionState = () => {
  const [loadedCareerTableSections, setLoadedCareerTableSections] = useAtom(
    loadedCareerTableSectionsAtom,
  );
  const [updatedAt, setUpdatedAt] = useAtom(updatedAtAtom);

  const searchParams = useSearchParams();

  const isTableView = useMemo(() => {
    return Boolean(searchParams.get("is_table"));
  }, []);

  const isSecrets = useMemo(() => {
    return Boolean(searchParams.get("is_secrets"));
  }, []);

  return {
    loadedCareerTableSections,
    setLoadedCareerTableSections,
    updatedAt,
    setUpdatedAt,
    isTableView,
    isSecrets,
  };
};
