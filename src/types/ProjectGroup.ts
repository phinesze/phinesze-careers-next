import { Project } from "@/types/Project";

export interface ProjectGroup {
  company?: string;
  companyAlias?: string;
  url?: string;
  projects: Project[];
}
