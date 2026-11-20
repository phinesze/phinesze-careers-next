"use client";

import { useAtomValue } from "jotai";
import { TitledPane } from "@/components/molecules/TitledPane";
import { EditPaneContent } from "@/components/organisms/EditPaneContent";
import { ViewPaneContent } from "@/components/organisms/ViewPaneContent";
import { showEditAtom, showPreviewAtom } from "@/store/useCareerHistoryState";
import { cn } from "@/utils/cn";

export default function IndexPage() {
  const showEdit = useAtomValue(showEditAtom);
  const showPreview = useAtomValue(showPreviewAtom);
  return (
    <div
      className={cn("grid h-full ", { "grid-cols-2": showEdit && showPreview })}
    >
      {
        <TitledPane title="編集" className={cn({ hidden: !showEdit })}>
          <EditPaneContent />
        </TitledPane>
      }
      {
        <TitledPane title="プレビュー" className={cn({ hidden: !showPreview })}>
          <ViewPaneContent />
        </TitledPane>
      }
    </div>
  );
}
