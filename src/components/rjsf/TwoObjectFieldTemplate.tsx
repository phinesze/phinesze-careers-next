import { ObjectFieldTemplateProps } from "@rjsf/utils";
import { Box, Grid } from "@mui/material";

export default function TwoObjectFieldTemplate(
  props: ObjectFieldTemplateProps,
) {
  return (
    <Box className={"m-0"}>
      {/* 2つのプロパティを1行に表示 */}
      <Grid container>
        {props.properties.map((p) => (
          <Grid key={p.name} size={{ xs: 12, md: 6 }}>
            {p.content}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
