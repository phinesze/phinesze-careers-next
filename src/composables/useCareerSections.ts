import { ChangeEvent } from "react";
import { DocumentSection } from "@/types/DocumentSection";
import { ProjectGroupSection } from "@/types/ProjectGroupSection";
import { CareerHistory } from "@/types/CareerHistory";
import { atom } from "jotai";
import { useCareerSectionState } from "@/composables/useCareerSectionState";

export const loadedCareerSectionsAtom = atom<
  (DocumentSection | ProjectGroupSection)[]
>([]);
export const updatedAtAtom = atom<string>("");

export const useCareerSections = () => {
  // const loadedCareerSections = ref<
  //   (DocumentSection | ProjectGroupSection)[]
  // >([]); // TODO: Vueでのrefの記述を下記のようにuseStateにするようにする
  const {
    loadedCareerSections,
    setLoadedCareerSections,
    setUpdatedAt,
    isSecrets,
  } = useCareerSectionState();

  const projectGroupsOfSections = loadedCareerSections.find(
    (s) => s.type === "project-groups",
  ) as ProjectGroupSection | undefined;

  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) {
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
      const parsedSectionData = JSON.parse(json) as CareerHistory;
      setLoadedCareerSections(parsedSectionData.sections);
      setUpdatedAt(parsedSectionData.updatedAt);
    };

    reader.readAsText(file);
  };
  return {
    isSecrets,
    projectGroupsOfSections,
    handleSelectFile,
  };
};
