import { Paper } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";

export type FamilyLogs = {
  date: Date;
  startHour?: string;
  endHour?: string;
  signature: string;
};

export function DetailTable(props: { logs: FamilyLogs[] }) {
  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        new Intl.DateTimeFormat().format(params.row.date),
    },
    {
      field: "startHour",
      headerName: "Start Hour",
      flex: 1,
    },
    {
      field: "endHour",
      headerName: "End Hour",
      flex: 1,
    },
    {
      field: "signature",
      headerName: "Signature",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <img
          src={params.row.signature}
          alt="Signature"
          style={{ maxHeight: "100%", maxWidth: "200px" }}
        />
      ),
    },
  ];

  const rows = props.logs.map((log, index) => ({
    id: index,
    ...log,
  }));

  const handleCellClick = (params: GridRenderCellParams) => {
    console.log("Cell clicked:", params.field);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 20, page: 0 } },
        }}
        disableRowSelectionOnClick
        sx={{
          border: 0,
        }}
        onCellClick={handleCellClick}
      />
    </Paper>
  );
}
