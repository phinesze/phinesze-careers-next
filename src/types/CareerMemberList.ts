/**
 * 経歴データにおける開発メンバーの数を表す
 * { "PM": 参加人数, "開発": [最小人数, 最大人数] } のような形で表す
 */
export interface CareerMemberList {
  [key: string]: number | [number, number];
}
