import { Section } from "@/types/Section";

/**
 * @title ドキュメントセクション
 * @description 経歴データの中で、自己PRや全体の経歴を自由形式で記述するドキュメントのセクションを表す
 * @type object
 */
export interface DocumentSection extends Section {
  type: "document";
  /**
   * @title ドキュメントのラベル
   * @description ドキュメントのラベルを自由形式で記述する。
   * @type string
   */
  label: string;
  /**
   * @title ドキュメントの本文
   * @description ドキュメントの本文を自由形式で記述する。HTML形式で記述することができる
   * @type string
   */
  detail: string;
}
