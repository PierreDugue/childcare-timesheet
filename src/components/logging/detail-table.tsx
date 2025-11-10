import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { useState } from "react";

export type FamilyLogs = {
  date: Date;
  startHour?: string;
  endHour?: string;
  signature: string;
  comment?: string;
};

export function DetailTable(props: { logs: FamilyLogs[] }) {
  const [open, setOpen] = useState(false);
  const [signatureToShow, setSignatureToShow] = useState<string>("null");
  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.row.date);
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(date);
      }
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
      field: "comment",
      headerName: "Comment",
      flex: 1,
    },
    {
      field: "signature",
      headerName: "Signature",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        if (params.row.signature !== "") {
          return (
            <img
              src={params.row.signature}
              alt="Signature"
              style={{ maxHeight: "100%", maxWidth: "200px" }}
            />
          );
        }
      },
    },
  ];

  const rows = props.logs.map((log, index) => ({
    id: index,
    ...log,
  }));

  const handleCellClick = (params: GridRenderCellParams) => {
    if (params.field === "signature" && params.row.signature) {
      setSignatureToShow(params.row.signature);
      setOpen(true);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
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

      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Signature</DialogTitle>
        <DialogContent>
          <img
            src={signatureToShow}
            alt="Signature"
            style={{ maxHeight: "400px", maxWidth: "400px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
