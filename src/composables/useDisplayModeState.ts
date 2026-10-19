import { useAtom } from "jotai/index";

import { atom } from "jotai";

export const showEditAtom = atom<boolean>(true);
export const showPreviewAtom = atom<boolean>(true);

export const useDisplayModeState = () => {
  const [showEdit, setShowEdit] = useAtom(showEditAtom);
  const [showPreview, setShowPreview] = useAtom(showPreviewAtom);

  const toggleShowEdit = () => setShowEdit((current) => !current);
  const toggleShowPreview = () => setShowPreview((current) => !current);

  return {
    showEdit,
    setShowEdit,
    toggleShowEdit,
    showPreview,
    setShowPreview,
    toggleShowPreview,
  };
};
