import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DocumentSection } from "@/types/DocumentSection";
import { ProjectGroupSection } from "@/types/ProjectGroupSection";
import { BiographyData } from "@/types/BiographyData";

const searchParams = useSearchParams();

// const loadedCareerTableSections = ref<
//   (DocumentSection | ProjectGroupSection)[]
// >([]); // TODO: Vueでのrefの記述を下記のようにuseStateにするようにする
const [loadedCareerTableSections, setLoadedCareerTableSections] = useState<(DocumentSection | ProjectGroupSection)[]>([]);
const [updatedAt, setUpdatedAt] = useState<string>("");

const isTableView = useMemo(() => {
  return Boolean(searchParams.get('is_table'));
}, []);


const isSecrets = useMemo(() => {
  return Boolean(searchParams.get('is_secrets'));
}, []);

export const useCareerTableSections = () => {
  const projectGroupsOfSections = loadedCareerTableSections.find(
    (s) => s.type === "project-groups",
  ) as ProjectGroupSection | undefined;

  const handleSelectFile = (event: Event) => {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) {
      return [];
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
    loadedCareerTableSections,
    updatedAt,
    isTableView,
    isSecrets,
    projectGroupsOfSections,
    handleSelectFile,
  };
};
