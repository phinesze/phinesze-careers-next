import { ReactNode } from "react";

export default function SubHeadingLabel({ children }: { children: ReactNode }) {
  return <div className={"bg-gray-200 p-[0.25mm] font-bold"}>{children}</div>;
}
