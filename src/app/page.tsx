"use client";

import { TitledPane } from "@/components/molecules/TitledPane";
import { CareerEditHistoryEdit } from "@/components/organisms/CareerEditHistoryEdit";
import { CareerHistoryView } from "@/components/organisms/CareerHistoryView";

export default function IndexPage() {
  return (
    <div className="grid h-full grid-cols-2">
      <TitledPane title="編集">
        <CareerEditHistoryEdit />
      </TitledPane>
      <TitledPane title="プレビュー">
        <CareerHistoryView />
      </TitledPane>
    </div>
  );
}
