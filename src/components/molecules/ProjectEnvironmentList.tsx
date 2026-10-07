"use client";

import { Project } from "@/types/Project";
import EnvironmentLabel from "@/components/atoms/EnvironmentLabel";

export default function ProjectEnvironmentList({
  environments,
}: {
  environments: NonNullable<Project["environments"]>;
}) {
  return (
    <ul className={"inline-block w-fit p-[1mm]"}>
      {Object.entries(environments).map(([environment, environmentDetail]) => {
        return (
          <li key={environment} className={"text-left"}>
            <span className={"font-bold"}>{environment}:</span>
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
