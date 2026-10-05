"use client";

import DateLabel from "@/components/atoms/DateLabel";
import { useCareerTableSections } from "@/composables/useCareerTableSections";
import CareerSectionDocumentBody from "@/components/organisms/CareerSection/DocumentBody";
import CareerSectionProjectsGroupsBody from "@/components/organisms/CareerSection/ProjectsGroupsBody";
import { useCareerTableSectionState } from "@/composables/useCareerTableSectionState";
import { Fragment } from "react";

export default function CareerSection() {
  const { loadedCareerTableSections, updatedAt } = useCareerTableSectionState();
  const { isSecrets } = useCareerTableSections();

  return (
    <main className=" min-h-[297mm] w-[210mm] bg-white p-[5mm] text-[2mm] text-black">
      <section className="relative mb-[2.5mm]">
        <div className="text-center text-[6mm]/none">職務経歴書</div>
        {isSecrets && <div className="text-[2.5mm]/[3.5mm]">機密要素あり</div>}
        <div className="absolute right-0 bottom-0 text-[1.75mm]/[2.5mm]">
          {updatedAt && <DateLabel value={updatedAt} />} 更新
        </div>
      </section>
      {loadedCareerTableSections.length > 0 && (
        <section
          className={`career-section border-2 ${isSecrets ? "secret" : ""}`}
        >
          {loadedCareerTableSections.map((section, index) => (
            <Fragment key={index}>
              {section.type === "document" && (
                <CareerSectionDocumentBody
                  label={section.label}
                  markdownText={section.detail}
                />
              )}
              {section.type === "project-groups" && (
                <CareerSectionProjectsGroupsBody groups={section.groups} />
              )}
            </Fragment>
          ))}
        </section>
      )}
      {!loadedCareerTableSections.length && (
        <div className="mt-[4mm] text-center text-[3.75mm]/[4.5mm]">
          「biographyData.jsonファイル選択」からファイルを選択してください
        </div>
      )}
    </main>
  );
}
