"use client";

import { ProjectGroup } from "@/types/ProjectGroup";
import { useCareerTableSectionState } from "@/composables/useCareerTableSectionState";
import IntervalDateLabel from "@/components/molecules/IntervalDateLabel";
import MarkdownDocument from "@/components/atoms/MarkdownDocument";

type Props = {
  groups: ProjectGroup[];
};

export default function CareerSectionProjectsGroupsBody({ groups }: Props) {
  const { isSecrets } = useCareerTableSectionState();
  let projectIndex = 0;
  return (
    <>
      {groups.map((group) => {
        return (
          <section key={group.companyAlias}>
            {/* {group.companyAlias} */}
            {/* 会社名 */}
            <div
              className={"bg-blue-100 border-y p-2 font-bold break-after-avoid"}
            >
              {isSecrets
                ? (group.company ?? group.companyAlias)
                : group.companyAlias}
              ProjectsGroupsBody
            </div>
            {/* 会社のプロジェクト */}
            {group.projects.map((project) => {
              projectIndex++;
              return (
                <section
                  key={project.id}
                  className={
                    "career-row break-inside-avoid border-t-[1px] border-b-[1px]"
                  }
                >
                  {/* 文章行部分 */}
                  <div className={"align-top flex p-0"}>
                    {/* 番号・期間 */}
                    <div className={"w-[20mm]"}>
                      <div
                        className={
                          "flex items-center border-r-2 h-full bg-lime-300 text-center"
                        }
                      >
                        <div className={"text-center"}>
                          #{projectIndex}
                          <IntervalDateLabel value={project.times} />
                        </div>
                      </div>
                    </div>
                    {/* 本文タイトル、本文、チーム人数・言語・フレームワーク */}
                    <div className={"w-full"}>
                      {/* 本文タイトル */}
                      <div className="font-bold p-2 bg-cyan-100 flex">
                        {project.title}
                      </div>
                      <div className="flex">
                        {/* 本文 */}
                        <MarkdownDocument
                          className={"w-0 flex-grow px-2 py-4"}
                          markdownText={project.detail}
                        ></MarkdownDocument>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </section>
        );
      })}
    </>
  );
}
