import { Section } from "~/types/Section.ts";

export interface DocumentSection extends Section {
  type: "document";
  label: string;
  detail: string;
}
