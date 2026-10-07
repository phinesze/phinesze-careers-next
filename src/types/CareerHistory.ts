import { DocumentSection } from "@/types/DocumentSection";
import { ProjectGroupSection } from "@/types/ProjectGroupSection";

/**
 * 経歴データのルート
 */
export interface CareerHistory {
  updatedAt: string;
  sections: (DocumentSection | ProjectGroupSection)[];
}
