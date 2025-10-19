"use client";

import DateLabel from "@/components/atoms/DateLabel";
import { useCareerTableSections } from "@/composables/useCareerTableSections";
import CareerSectionDocumentBody from "@/components/organisms/CareerSection/DocumentBody";
import CareerSectionProjectsGroupsBody from "@/components/organisms/CareerSection/ProjectsGroupsBody";
import { useCareerTableSectionState } from "@/composables/useCareerTableSectionState";

export default function CareerSection() {

  const { loadedCareerTableSections, updatedAt } = useCareerTableSectionState();
  const { isSecrets } =
    useCareerTableSections();

  return <>
    <section className="relative mb-5">
      <div className="text-5xl text-center">職務経歴書</div>
      <div v-if="isSecrets" className="text-xl">機密要素あり</div>
      <div className="absolute right-0 bottom-0 text-sm">
        {updatedAt && <DateLabel value={updatedAt} />} 更新
      </div>
    </section>
    { loadedCareerTableSections.length > 0 &&
      <section className={`career-section border-2 ${isSecrets ? 'secret' : ''}`}>
        {
          loadedCareerTableSections.map((section, index) =>
            <>
              {
                section.type === 'document' && <CareerSectionDocumentBody
                  key={index}
                  label={section.label}
                  markdownText={section.detail}
                />
              }
              {
                section.type === 'project-groups' && <CareerSectionProjectsGroupsBody
                  key={index}
                  groups={section.groups}
                />
              }
            </>
          )
        }
      </section>
    }
    {
      !loadedCareerTableSections.length &&
      <div className="mt-8 text-3xl text-center">
        「biographyData.jsonファイル選択」からファイルを選択してください
      </div>
    }
  </>
}