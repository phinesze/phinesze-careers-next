/**
 * 経歴データにおける開発メンバーの数などを表す
 * { "PM": "8~10人" のような形で表す
 */
export interface ProjectTeamList {
  [key: string]: string;
}
