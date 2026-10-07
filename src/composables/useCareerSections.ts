import { ChangeEvent } from "react";
import { ProjectGroupSection } from "@/types/ProjectGroupSection";
import { CareerHistory } from "@/types/CareerHistory";
import { useCareerHistoryState } from "@/composables/useCareerHistoryState";

export const useCareerSections = () => {
  const { careerHistory, setCareerHistory, isSecrets } =
    useCareerHistoryState();

  const projectGroupsOfSections = careerHistory.sections.find(
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
      setCareerHistory(parsedSectionData);
    };

    reader.readAsText(file);
  };
  return {
    isSecrets,
    projectGroupsOfSections,
    handleSelectFile,
  };
};
