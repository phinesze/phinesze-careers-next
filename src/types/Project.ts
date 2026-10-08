import { CareerEnvironmentList } from "@/types/CareerEnvironmentList";
import { CareerMemberList } from "@/types/CareerMemberList";

export interface Project {
  title?: string;
  detail?: string;
  secretDetail?: string;
  times?: {
    start: string;
    end?: string;
  };
  teams?: CareerMemberList;
  environments?: CareerEnvironmentList;
}
