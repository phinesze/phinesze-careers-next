"use client";

import { TitledPane } from "@/components/molecules/TitledPane";
import { CareerEditHistoryEdit } from "@/components/organisms/CareerEditHistoryEdit";
import { CareerHistoryView } from "@/components/organisms/CareerHistoryView";
import { useDisplayModeState } from "@/composables/useDisplayModeState";
import { cn } from "@/utils/cn";

export default function IndexPage() {
  const { showEdit, showPreview } = useDisplayModeState();
  return (
    <div
      className={cn("grid h-full ", { "grid-cols-2": showEdit && showPreview })}
    >
      {
        <TitledPane title="編集" className={cn({ hidden: !showEdit })}>
          <CareerEditHistoryEdit />
        </TitledPane>
      }
      {
        <TitledPane title="プレビュー" className={cn({ hidden: !showPreview })}>
          <CareerHistoryView />
        </TitledPane>
      }
    </div>
  );
}
