import { useSelector } from "react-redux";
import {
  selectAllFamilyByUserId,
  type FamilyState,
} from "../slices/familySlice";
import { useEffect } from "react";
import { Button, Paper, Stack } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShowChartIcon from "@mui/icons-material/ShowChart";

export function FamilyTable() {
  const listOfFamilies = useSelector((state: FamilyState) =>
    selectAllFamilyByUserId({ family: state }, "user_p4_7720")
  );

  const handleEdit = (id: number) => {
    console.log("Edit family:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete family:", id);
  };

  const logsColumns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "familyId", headerName: "ID", width: 70 },
    {
      field: "",
      headerName: "Settings",
      width: 130,
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
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<ShowChartIcon />}
            onClick={() => handleDelete(params.row.id)}
          >
            Show logs
          </Button>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    console.log("families for user_p4_7720", listOfFamilies);
  });
  return (
    <div>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(listOfFamilies) => listOfFamilies.familyId}
          rows={listOfFamilies}
          columns={logsColumns}
          initialState={{ pagination: {} }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}
