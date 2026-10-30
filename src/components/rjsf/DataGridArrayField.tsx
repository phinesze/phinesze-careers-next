import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FieldProps, RJSFSchema, UiSchema } from "@rjsf/utils";

type Item = Record<string, string>;
type Row = Item & { id: number };

const ROW_HEIGHT = 32;
const ACTIONS_WIDTH = 34 * 3;

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
        <>
          <IconButton
            onClick={() => handleSwapRow(row.id - 1)}
            disabled={row.id <= 0}
          >
            <ArrowUpwardIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => handleSwapRow(row.id)}
            disabled={row.id >= items.length - 1}
          >
            <ArrowDownwardIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => update(items.filter((_, i) => i !== row.id))}
          >
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </>
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

  // 上下の矢印ボタン押下時に隣の行の入れ替えを行う。
  const handleSwapRow = (startId: number) => {
    const newItems = [...items];
    [newItems[startId + 1], newItems[startId]] = [
      items[startId],
      items[startId + 1],
    ];
    update(newItems);
  };

  // 追加ボタン押下時に行の追加を行う
  const handleAdd = () =>
    update([...items, Object.fromEntries(keys.map((k) => [k, ""]))]);

  const title = uiSchema?.["ui:title"] ?? schema.title;
  const description = uiSchema?.["ui:description"] ?? schema.description;

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
