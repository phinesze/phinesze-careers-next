"use client";

import { Project } from "@/types/Project";
import { EnvironmentLabel } from "@/components/atoms/EnvironmentLabel";

export function ProjectEnvironmentList({
  environments,
}: {
  environments: NonNullable<Project["environments"]>;
}) {
  return (
    <ul className={"inline-block w-fit p-[1mm]"}>
      {environments.map(({ category, environments: environmentDetail }) => {
        return (
          <li key={category} className={"text-left"}>
            <span className={"font-bold"}>{category}:</span>
            <div className={"ml-[0.5mm]"}>
              {environmentDetail.map((detail, index) => (
                <div key={index} className={"block"}>
                  <EnvironmentLabel element={detail} />
                </div>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
