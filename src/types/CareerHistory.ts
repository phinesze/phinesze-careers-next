import { DocumentSection } from "@/types/DocumentSection";
import { ProjectGroupSection } from "@/types/ProjectGroupSection";

/**
 * 経歴データのルート
 */
export interface CareerHistory {
  /**
   * @title 更新日
   * @format date
   * @description 経歴データの更新日を表す。YYYY-MM-DD形式で表す
   * @example 2025-01-01
   */
  updatedAt?: string;

  /**
   * @title 経歴データのセクションの配列
   * @description セクションの種類は、ドキュメントセクションとプロジェクトグループセクションの2種類がある
   * @type array
   */
  sections: (DocumentSection | ProjectGroupSection)[];
}
