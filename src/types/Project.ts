import { CareerEnvironmentList } from "@/types/CareerEnvironmentList";

export interface Project {
  id: number;
  title?: string;
  detail?: string;
  secretDetail?: string;
  times?: {
    start: string;
    end?: string;
  };
  teams?: { [key: string]: number };
  environments?: CareerEnvironmentList;
}
