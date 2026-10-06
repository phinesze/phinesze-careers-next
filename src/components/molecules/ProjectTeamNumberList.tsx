"use client";

import { Project } from "@/types/Project";
import ProjectTeamNumberLabel from "@/components/atoms/TeamNumberLabel";

export default function ProjectTeamNumberList({
  teams,
}: {
  teams: NonNullable<Project["teams"]>;
}) {
  return (
    <ul className={"inline-block w-fit p-[1mm]"}>
      {Object.entries(teams).map(([team, teamNumber]) => {
        return (
          <li key={team} className={"text-left"}>
            {team}:
            <ProjectTeamNumberLabel value={teamNumber} />
          </li>
        );
      })}
    </ul>
  );
}
