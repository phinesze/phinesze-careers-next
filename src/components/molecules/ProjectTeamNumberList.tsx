"use client";

import { ProjectTeamNumberLabel } from "@/components/atoms/TeamNumberLabel";
import { Project } from "@/types/Project";

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
