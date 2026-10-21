import {
  ArrayFieldItemTemplateProps,
  FieldProps,
  getTemplate,
  getUiOptions,
} from "@rjsf/utils";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactElement, useContext } from "react";

import { ArrayFieldTemplateContext } from "./ArrayFieldTemplate";
import { start } from "repl";

export function ArrayFieldItemTemplate(props: ArrayFieldItemTemplateProps) {
  const { children, buttonsProps, hasToolbar, uiSchema, registry } = props;
  const uiOptions = getUiOptions(uiSchema);
  const ArrayFieldItemButtonsTemplate = getTemplate(
    "ArrayFieldItemButtonsTemplate",
    registry,
    uiOptions,
  );

  const { minItems } = useContext(ArrayFieldTemplateContext);
  const formData = (children as ReactElement<FieldProps>).props.formData;

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

  const getItemAccordionLabel = () => {
    const key = buttonsProps.fieldPathId.path.at(-2);
    const value =
      accordionLabelFunctions[key as keyof typeof accordionLabelFunctions]?.();
    if (value) {
      return value;
    } else {
      return `${props.parentUiSchema?.["ui:title"]} ${props.totalItems >= 2 ? `-${props.index + 1}` : ""}`;
    }
  };

  return (
    <Box className="mt-2 flex items-start">
      {hasToolbar && (
        <Accordion className="w-full border border-gray-300">
          {/* buttonの入れ子によるhydration errorを防ぐため内部のcomponentをデフォルトのbuttonからdivに変更する */}
          <AccordionSummary
            component="div"
            className="my-0"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              "& .MuiAccordionSummary-content, & .MuiAccordionSummary-content.Mui-expanded":
                { margin: 0 },
            }}
          >
            <div className="flex w-full items-center justify-center">
              <Typography component="span" className="my-0 flex-1">
                {getItemAccordionLabel()}
              </Typography>
              <ArrayFieldItemButtonsTemplate
                {...buttonsProps}
                hasRemove={
                  buttonsProps.hasRemove && buttonsProps.totalItems > minItems
                }
                style={{ paddingLeft: 3, paddingRight: 6, minWidth: 0 }}
              />
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="px-4">{children}</Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}
