"use client";

import { ProjectGroup } from "@/types/ProjectGroup";
import { useCareerHistoryState } from "@/composables/useCareerHistoryState";
import IntervalDateLabel from "@/components/molecules/IntervalDateLabel";
import MarkdownDocument from "@/components/atoms/MarkdownDocument";
import ProjectTeamNumberList from "@/components/molecules/ProjectTeamNumberList";
import ProjectEnvironmentList from "@/components/molecules/ProjectEnvironmentList";
import SubHeadingLabel from "@/components/atoms/SubHeadingLabel";

type Props = {
  groups: ProjectGroup[];
};

export default function CareerHistoryViewProjectsGroupsBody({ groups }: Props) {
  const { isSecrets } = useCareerHistoryState();
  let projectIndex = 0;
  return (
    <>
      {groups.map((group, groupIndex) => {
        return (
          <section key={groupIndex}>
            {/* {group.companyAlias} */}
            {/* 会社名 */}
            <div
              className={
                "break-after-avoid border-y bg-blue-100 p-[1mm] font-bold"
              }
            >
              {isSecrets
                ? (group.company ?? group.companyAlias)
                : group.companyAlias}
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
                  <div className={"flex p-0 align-top"}>
                    {/* 番号・期間 */}
                    <div className={"w-[20mm]"}>
                      <div
                        className={
                          "flex h-full items-center border-r-2 bg-lime-300 text-center"
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
                      <div className="flex bg-cyan-100 p-[1mm] font-bold">
                        {project.title}
                      </div>
                      <div className="flex">
                        {/* 本文 */}
                        <MarkdownDocument
                          className={"w-0 flex-grow px-[1mm] py-[2mm]"}
                          markdownText={project.detail}
                        ></MarkdownDocument>
                        {/* チーム人数、言語・フレームワーク */}
                        <div
                          className={"w-[50mm] flex-grow-0 pt-[2mm] align-top"}
                        >
                          {/* チーム人数 */}
                          {project.teams && (
                            <>
                              <SubHeadingLabel>チーム人数</SubHeadingLabel>
                              <ProjectTeamNumberList teams={project.teams} />
                            </>
                          )}
                          {/* 言語・フレームワーク詳細 */}
                          {project.environments && (
                            <>
                              <SubHeadingLabel>
                                言語・フレームワーク
                              </SubHeadingLabel>
                              <ProjectEnvironmentList
                                environments={project.environments}
                              />
                            </>
                          )}
                        </div>
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
