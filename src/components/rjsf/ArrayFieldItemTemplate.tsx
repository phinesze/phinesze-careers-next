import {
  ArrayFieldItemTemplateProps,
  getTemplate,
  getUiOptions,
} from "@rjsf/utils";
import { Box, Paper } from "@mui/material";
import { cn } from "@/utils/cn";
import { useContext } from "react";
import { ArrayFieldTemplateContext } from "./ArrayFieldTemplate";
import { CompanyFieldContext } from "./CompanyRowObjectFieldTemplate";

export function ArrayFieldItemTemplate(props: ArrayFieldItemTemplateProps) {
  const { children, buttonsProps, hasToolbar, uiSchema, registry } = props;
  const uiOptions = getUiOptions(uiSchema);
  const ArrayFieldItemButtonsTemplate = getTemplate(
    "ArrayFieldItemButtonsTemplate",
    registry,
    uiOptions,
  );

  const { title, isShortFields, minItems } = useContext(
    ArrayFieldTemplateContext,
  );
  const { showingCompany } = useContext(CompanyFieldContext);

  return (
    <Box className="mt-2 flex items-start gap-2">
      <Paper
        elevation={0}
        className="min-w-0 flex-1 rounded-md border border-gray-300"
      >
        {hasToolbar && (
          <Box
            className={cn(
              "flex h-6 flex-shrink-0 items-center justify-end ",
              isShortFields ? "" : "bg-gray-200",
            )}
          >
            {!isShortFields && (
              <div className="ml-2 flex-1 text-sm">
                {/* 会社／組織別のプロジェクトの内部のプロジェクトの各アイテムのタイトルは「（会社／組織名）のプロジェクト」となる */}{" "}
                {/* その他のアイテムのタイトルは「・・のプロジェクト-（インデックス + 1）」となる */}
                {`${showingCompany && title === "projects" ? `${showingCompany}の` : ""}${props.parentUiSchema?.["ui:title"]}${props.totalItems >= 2 ? `-${props.index + 1}` : ""}`}
              </div>
            )}
            <ArrayFieldItemButtonsTemplate
              {...buttonsProps}
              hasRemove={
                buttonsProps.hasRemove && buttonsProps.totalItems > minItems
              }
              style={{ paddingLeft: 6, paddingRight: 6, minWidth: 0 }}
            />
          </Box>
        )}
        <Box className={cn(isShortFields ? "px-2" : "px-4")}>{children}</Box>
      </Paper>
    </Box>
  );
}
