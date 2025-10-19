import { ChangeEvent, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { DocumentSection } from "@/types/DocumentSection";
import { ProjectGroupSection } from "@/types/ProjectGroupSection";
import { BiographyData } from "@/types/BiographyData";
import { atom } from "jotai";
import { useCareerTableSectionState } from "@/composables/useCareerTableSectionState";

export const loadedCareerTableSectionsAtom = atom<(DocumentSection | ProjectGroupSection)[]>([]);
export const updatedAtAtom = atom<string>("")

export const useCareerTableSections = () => {
  const searchParams = useSearchParams();

  // const loadedCareerTableSections = ref<
  //   (DocumentSection | ProjectGroupSection)[]
  // >([]); // TODO: Vueでのrefの記述を下記のようにuseStateにするようにする
  const {
    loadedCareerTableSections,
    setLoadedCareerTableSections,
    setUpdatedAt
  } = useCareerTableSectionState()

  const isTableView = useMemo(() => {
    return Boolean(searchParams.get('is_table'));
  }, []);

  const isSecrets = useMemo(() => {
    return Boolean(searchParams.get('is_secrets'));
  }, []);

  const projectGroupsOfSections = loadedCareerTableSections.find(
    (s) => s.type === "project-groups",
  ) as ProjectGroupSection | undefined;

  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement)?.files?.[0];    if (!file) {
      return;
    }
    const reader = new FileReader();
    const ext = file.name.split(".").pop()?.toLowerCase();

    if (ext && !["json"].includes(ext)) {
      alert("読み込み可能なファイルはjson形式のみです");
    }

    reader.onload = (e) => {
      const json = e.target?.result;
      if (typeof json !== "string") {
        alert("error");
        return;
      }
      const parsedSectionData = JSON.parse(json) as BiographyData;
      setLoadedCareerTableSections(parsedSectionData.sections)
      setUpdatedAt(parsedSectionData.updatedAt);
    };

    reader.readAsText(file);
  };
  return {
    isTableView,
    isSecrets,
    projectGroupsOfSections,
    handleSelectFile,
  };
};
