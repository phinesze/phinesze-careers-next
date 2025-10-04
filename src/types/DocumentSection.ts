import { Section } from "@/types/Section";

export interface DocumentSection extends Section {
  type: "document";
  label: string;
  detail: string;
}
