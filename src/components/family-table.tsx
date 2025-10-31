import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Button, Paper, Stack } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { removeFamily, selectAllFamily } from "../slices/familySlice";
import { AlertDialog } from "./alert-dialog";
import { useState } from "react";
import { useNavigate } from "react-router";

export function FamilyTable(props: { onEdit: (familyId: string) => void }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listOfFamilies = useSelector(selectAllFamily);
  const [alertDialogConfig, setAlertDialogConfig] = useState<{
    title: string;
    body: string;
  }>({ title: "", body: "" });
  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);
  const [familyToDelete, setFamilyToDelete] = useState<string>("");

  const handleEdit = (id: string) => {
    props.onEdit(id);
  };

  const handleDelete = (familyId: string, name: string) => {
    setFamilyToDelete(familyId);
    setAlertDialogConfig({
      title: "ATTENTION: Delete Family",
      body: `Are you sure you want to delete family: ${name}? This well also delete all associated logs.`,
    });
    setAlertDialogOpen(true);
  };

  const handleApproveDelete = () => {
    dispatch(removeFamily(familyToDelete));
    setAlertDialogOpen(false);
  };

  const handleCloseAlert = () => {
    setAlertDialogOpen(false);
  };

  const handleLogs = (familyId: string) => {
    navigate(`/details/${familyId}`);
  };

  const logsColumns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "familyId", headerName: "ID", flex: 1 },
    {
      field: "",
      headerName: "Settings",
      flex: 2,
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
            startIcon={<EditIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleEdit(params.row.familyId);
            }}
          ></Button>

          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(params.row.familyId, params.row.name);
            }}
          ></Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<ShowChartIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleLogs(params.row.familyId);
            }}
          ></Button>
        </Stack>
      ),
    },
  ];

  return (
    <div>
      <Paper sx={{ width: "100%" }}>
        <DataGrid
          getRowId={(listOfFamilies) => listOfFamilies.familyId}
          rows={listOfFamilies.value}
          columns={logsColumns}
          initialState={{
            pagination: { paginationModel: { pageSize: 20, page: 0 } },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          sx={{ border: 0 }}
          disableRowSelectionOnClick
        />
      </Paper>
      <AlertDialog
        title={alertDialogConfig.title}
        body={alertDialogConfig.body}
        onClose={handleCloseAlert}
        onApprove={handleApproveDelete}
        open={alertDialogOpen}
      ></AlertDialog>
    </div>
  );
}
