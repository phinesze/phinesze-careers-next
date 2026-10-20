import { WidgetProps } from "@rjsf/utils";

/**
 * 選択を変更する前に確認ダイアログを出すセレクトウィジェット
 * セクション種別（anyOf の選択）を変更すると入力内容が消去されるため、変更前に確認のアラートを出す
 */
export function SectionTypeWidget(props: WidgetProps) {
  const { registry, value, onChange } = props;
  const { SelectWidget } = registry.widgets;

  return (
    <>
      <SelectWidget
        {...props}
        onChange={(next) => {
          if (next === value) {
            return;
          }
          if (
            confirm(
              "セクション種別を変更すると、このセクションの記述内容は消去されます。変更しますか？",
            )
          ) {
            onChange(next);
          }
        }}
      />
    </>
  );
}
