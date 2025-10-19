"use client";

import { ProjectGroup } from "@/types/ProjectGroup";
import { useCareerTableSectionState } from "@/composables/useCareerTableSectionState";

type Props = {
  groups: ProjectGroup[];
}

export default function CareerSectionProjectsGroupsBody({ groups } : Props) {
  const { isSecrets } = useCareerTableSectionState()
  return <>
    {
      groups.map((group) => {
        return <section key={group.companyAlias}>
          {/* {group.companyAlias} */}
          {/* 会社名 */}
          <div className={"bg-blue-100 border-y p-2 font-bold break-after-avoid"}>
            { isSecrets ? group.company ?? group.companyAlias : group.companyAlias }
          </div>
        </section>

      })
    }
  </>
}