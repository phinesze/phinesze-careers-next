import { ProjectEnvironmentList } from "@/types/ProjectEnvironmentList";
import { ProjectTeamList } from "@/types/ProjectTeamList";

export interface Project {
  title?: string;
  detail?: string;
  secretDetail?: string;
  times?: {
    start?: string;
    end?: string;
  };
  teams?: ProjectTeamList[];
  environments?: ProjectEnvironmentList[];
}
