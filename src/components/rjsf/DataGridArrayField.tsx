import { FieldProps, RJSFSchema, UiSchema } from "@rjsf/utils";
import { Box, Button, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Item = Record<string, string>;
type Row = Item & { id: number };

const ROW_HEIGHT = 32;
const ACTIONS_WIDTH = 36;

/**
 * 文字列プロパティのみを持つオブジェクトの配列を DataGrid で表形式編集するカスタムフィールド
 * 列名は items の uiSchema の "ui:title" → schema の title → プロパティ名 の順で決定する
 */
export function DataGridArrayField(props: FieldProps<Item[]>) {
  const { schema, uiSchema, formData, onChange, fieldPathId, registry } = props;

  const itemSchema = registry.schemaUtils.retrieveSchema(
    schema.items as RJSFSchema,
  );
  const itemUiSchema = (uiSchema?.items ?? {}) as UiSchema;
  const keys = Object.keys(itemSchema.properties ?? {});
  const items = formData ?? [];

  const update = (next: Item[]) => onChange(next, fieldPathId.path);

  const columns: GridColDef<Row>[] = [
    ...keys.map<GridColDef<Row>>((key) => ({
      field: key,
      headerName: itemUiSchema[key]?.["ui:title"],
      flex: 1,
      editable: true,
      sortable: false,
      resizable: false,
    })),
    {
      field: "__actions",
      headerName: "",
      width: ACTIONS_WIDTH,
      editable: false,
      sortable: false,
      resizable: false,
      renderCell: ({ row }) => (
        <IconButton
          onClick={() => update(items.filter((_, i) => i !== row.id))}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  // 配列の index を DataGrid の行 id として使う
  const rows: Row[] = items.map((item, i) => ({ ...item, id: i }));

  const handleProcessRowUpdate = (newRow: Row) => {
    const { id, ...item } = newRow;
    update(items.map((old, i) => (i === id ? { ...old, ...item } : old)));
    return newRow;
  };

  const handleAdd = () =>
    update([...items, Object.fromEntries(keys.map((k) => [k, ""]))]);

  const title = (uiSchema?.["ui:title"] as string | undefined) ?? schema.title;
  const description =
    (uiSchema?.["ui:description"] as string | undefined) ?? schema.description;

  return (
    <Box sx={{ my: 2 }}>
      {title && <Typography variant="subtitle1">{title}</Typography>}
      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        columnHeaderHeight={ROW_HEIGHT}
        rowHeight={ROW_HEIGHT}
        autoHeight
        hideFooter
        disableColumnMenu
        disableRowSelectionOnClick
        processRowUpdate={handleProcessRowUpdate}
      />
      <Button startIcon={<AddIcon />} onClick={handleAdd} sx={{ mt: 1 }}>
        追加
      </Button>
    </Box>
  );
}
