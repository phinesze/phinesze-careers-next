import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import {
  ArrayFieldItemTemplateProps,
  getTemplate,
  getUiOptions,
} from "@rjsf/utils";
import { useArrayFieldItem } from "@/composables/useArrayFieldItem";

export function ArrayFieldItemTemplate(props: ArrayFieldItemTemplateProps) {
  const { children, buttonsProps, uiSchema, registry } = props;
  const uiOptions = getUiOptions(uiSchema);
  const ArrayFieldItemButtonsTemplate = getTemplate(
    "ArrayFieldItemButtonsTemplate",
    registry,
    uiOptions,
  );

  const { getItemAccordionLabel } = useArrayFieldItem(props);

  return (
    <Box className="mt-2 flex items-start">
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
              hasRemove={buttonsProps.hasRemove}
              style={{ paddingLeft: 3, paddingRight: 6, minWidth: 0 }}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="px-4">{children}</Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
