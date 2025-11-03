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
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export type FamilyLogs = {
  date: Date;
  startHour?: string;
  endHour?: string;
  signature: string;
  comment?: string;
};

export function DetailTable(props: { logs: FamilyLogs[] }) {
  const [open, setOpen] = useState(false);
  const signatureToShow = useRef(null);
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
      field: "comment",
      headerName: "Comment",
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
    console.log("Cell clicked:", params);
    if (params.field === "signature" && params.row.signature) {
      signatureToShow.current?.fromDataURL(params.row.signature);
      setOpen(true);
    }
  };

  const onClose = () => {
    setOpen(false);
  }

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
          <SignatureCanvas
            ref={signatureToShow}
            penColor="black"
            backgroundColor="#050404ff"
            canvasProps={{
              width: 400,
              height: 200,
              style: { border: "1px solid #ccc", borderRadius: "8px" },
            }}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
