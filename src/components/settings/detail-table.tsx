import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
} from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridCellParams
} from "@mui/x-data-grid";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlertDialog } from "../ui/alert-dialog";
import { useDispatch } from "react-redux";
import { removeLog } from "../../slices/family-slice";

export type FamilyLogs = {
  date: Date;
  startHour?: string;
  endHour?: string;
  signature: string;
  comment?: string;
};

const ALERT_DIALOG_TITLE = 'Delete log';
const ALERT_DIALOG_BODY = 'Are you sure you want to delete this log?';


export function DetailTable(props: { logs: FamilyLogs[], familyId: string }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [signatureToShow, setSignatureToShow] = useState<string>("null");
  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);
  const [logToDelete, setLogToDelete] = useState<number>(0);
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
    {
      field: "",
      headerName: "Settings",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          width="100%"
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleRemove(params.row.id);
            }}
          ></Button>
        </Stack>
      ),
    },
  ];

  const handleRemove = (logId: number) => {
    setLogToDelete(logId);
    setAlertDialogOpen(true);
  }

  const handleApproveDelete = () => {
    dispatch(removeLog({ logId: logToDelete, familyId: props.familyId }));
    setAlertDialogOpen(false);
  };

  const handleCloseAlert = () => {
    setAlertDialogOpen(false);
  };

  const rows = props.logs.map((log, index) => ({
    id: index,
    ...log,
  }));

  const handleCellClick = (params: GridCellParams ) => {
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
      <AlertDialog
        title={ALERT_DIALOG_TITLE}
        body={ALERT_DIALOG_BODY}
        onClose={handleCloseAlert}
        onApprove={handleApproveDelete}
        open={alertDialogOpen}
      ></AlertDialog>
    </>
  );
}
