import { useAtom } from "jotai/index";
import { loadedCareerTableSectionsAtom, updatedAtAtom } from "@/composables/useCareerTableSections";

export const useCareerTableSectionState = () => {
  const [loadedCareerTableSections, setLoadedCareerTableSections] = useAtom(loadedCareerTableSectionsAtom);
  const [updatedAt, setUpdatedAt] = useAtom(updatedAtAtom);

  return {
    loadedCareerTableSections,
    setLoadedCareerTableSections,
    updatedAt,
    setUpdatedAt,
  };
};