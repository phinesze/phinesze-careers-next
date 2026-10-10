"use client";

import { Project } from "@/types/Project";
import { ProjectTeamNumberLabel } from "@/components/atoms/TeamNumberLabel";

export function ProjectTeamNumberList({
  teams,
}: {
  teams: NonNullable<Project["teams"]>;
}) {
  return (
    <ul className={"inline-block w-fit p-[1mm]"}>
      {teams.map(({ category, detail }) => {
        return (
          <li key={category} className={"text-left"}>
            {category}:
            <ProjectTeamNumberLabel value={detail} />
          </li>
        );
      })}
    </ul>
  );
}
