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
            ? `${formData.label}(ドキュメントセクション)`
            : "(新しいドキュメントセクション)";
        case "project-groups":
          return `${JSON.stringify(formData.groups?.length)}件の一連の期間の会社／組織が登録されたプロジェクトグループセクション`;
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

      return `${companyStr ? companyStr : `(新しい${props.parentUiSchema?.["ui:title"]})`} ${startTime ? `${startTime}~${endTime || ""}` : ""}`;
    },
    // 組織内で携わったプロジェクト
    projects: () => {
      const startTime = formData.times?.start;
      const endTime = formData.times?.end;

      return `${formData.title ? formData.title : "(新しいプロジェクト)"} ${startTime ? `${startTime}~${endTime || ""}` : ""}`;
    },
    // 言語・フレームワークのカテゴリ
    environments: () => {
      return `${formData.category ? formData.category : `(新しいカテゴリ)`} `;
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
      {/* {JSON.stringify(formData)} */}
      {hasToolbar && (
        <Accordion className="w-full">
          <AccordionSummary
            className="bg-gray-300"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography component="span">
              {/* 会社／組織別のプロジェクトの内部のプロジェクトの各アイテムのタイトルは「（会社／組織名）のプロジェクト」となる */}{" "}
              {/* その他のアイテムのタイトルは「・・のプロジェクト-（インデックス + 1）」となる */}
              {getItemAccordionLabel()}
              <ArrayFieldItemButtonsTemplate
                {...buttonsProps}
                hasRemove={
                  buttonsProps.hasRemove && buttonsProps.totalItems > minItems
                }
                style={{ paddingLeft: 3, paddingRight: 6, minWidth: 0 }}
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="px-4">{children}</Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}
