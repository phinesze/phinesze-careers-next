import { ArrayFieldItemTemplateProps, FieldProps } from "@rjsf/utils";
import { ReactElement } from "react";

export function useArrayFieldItem(props: ArrayFieldItemTemplateProps) {
  const { children, buttonsProps } = props;
  const formData = (children as ReactElement<FieldProps>).props.formData;

  function getItemAccordionLabel() {
    const accordionLabelFunctions = {
      sections: () => {
        switch (formData.type) {
          case "document":
            return formData.label
              ? `${formData.label}（ドキュメントセクション）`
              : "（新しいドキュメントセクション）";
          case "project-groups":
            return `${formData.groups?.length ?? 0}件の会社／組織（プロジェクトグループセクション）`;
        }
      },
      //
      groups: () => {
        const companyStr = formData.company || formData.companyAlias;
        const startTime = formData.projects
          .map((project: { times: { start: string } }) => project?.times?.start)
          .sort()?.[0];

        const endTime = formData.projects
          .map((project: { times: { end: string } }) => project?.times?.end)
          .sort()
          ?.at(-1);

        return `${companyStr ? companyStr : `（新しい${props.parentUiSchema?.["ui:title"]}）`} ${startTime ? `${startTime}〜${endTime || ""}` : ""}`;
      },
      // 組織内で携わったプロジェクト
      projects: () => {
        const startTime = formData.times?.start;
        const endTime = formData.times?.end;

        return `${formData.title ? formData.title : "（新しいプロジェクト）"} ${startTime ? `${startTime}〜${endTime || ""}` : ""}`;
      },
      // 言語・フレームワークのカテゴリ
      environments: () => {
        return `${formData.category ? formData.category : "（新しいカテゴリ）"} `;
      },
    };

    const key = buttonsProps.fieldPathId.path.at(-2);
    const value =
      accordionLabelFunctions[key as keyof typeof accordionLabelFunctions]?.();
    if (value) {
      return value;
    } else {
      return `${props.parentUiSchema?.["ui:title"]} ${props.totalItems >= 2 ? `-${props.index + 1}` : ""}`;
    }
  }

  return { getItemAccordionLabel };
}
