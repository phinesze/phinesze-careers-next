import { atom, useAtom } from "jotai";

// 編集・プレビュー画面の表示／非表示の切り替え状態を保持するためのatom
const showEditAtom = atom<boolean>(true);
const showPreviewAtom = atom<boolean>(true);

/**
 * 編集・プレビューの表示切り替え用。どちらも非表示になる状態は作らない
 */
export const useDisplayModeState = () => {
  const [showEdit, setShowEdit] = useAtom(showEditAtom);
  const [showPreview, setShowPreview] = useAtom(showPreviewAtom);

  /**
   * 編集画面の表示／非表示を切り替える
   */
  const toggleShowEdit = () => setShowEdit((current) => !current);

  /**
   * プレビュー画面の表示／非表示を切り替える
   */
  const toggleShowPreview = () => setShowPreview((current) => !current);

  /**
   * 印刷用にプレビュー画面のみを表示させる。印刷ダイアログを出す直前に実行する
   */
  const showPreviewOnly = () => {
    setShowEdit(false);
    setShowPreview(true);
  };

  return {
    showEdit,
    toggleShowEdit,
    showPreview,
    toggleShowPreview,
    showPreviewOnly,
  };
};
