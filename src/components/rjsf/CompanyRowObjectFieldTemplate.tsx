import { ObjectFieldTemplateProps } from "@rjsf/utils";
import { Box, Grid } from "@mui/material";

const ROW_FIELDS = ["company", "companyAlias", "url"];

export default function CompanyRowObjectFieldTemplate(
  props: ObjectFieldTemplateProps,
) {
  const rowItems = ROW_FIELDS.map((name) =>
    props.properties.find((p) => p.name === name),
  ).filter((p) => p !== undefined);
  const restItems = props.properties.filter(
    (p) => !ROW_FIELDS.includes(p.name),
  );

  return (
    <Box>
      {/* 会社名・略称・URL を1行に表示 */}
      <Grid container spacing={2}>
        {rowItems.map((p) => (
          <Grid key={p.name} size={{ xs: 12, md: 4 }}>
            {p.content}
          </Grid>
        ))}
      </Grid>
      {/* projects などそれ以外の項目は従来どおり縦に並べる */}
      {restItems.map((p) => (
        <Box key={p.name}>{p.content}</Box>
      ))}
    </Box>
  );
}
