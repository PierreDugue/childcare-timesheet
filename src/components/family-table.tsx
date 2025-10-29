import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Button, Paper, Stack } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { selectAllFamilyByUserId } from "../slices/familySlice";

export function FamilyTable() {
  const listOfFamilies = useSelector((state: RootState) =>
    selectAllFamilyByUserId(state, "f5e3b6a2-96b1-4a03-9cb9-d89b4e78c21a")
  );

  const handleEdit = (id: number) => {
    console.log("Edit family:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete family:", id);
  };

  const logsColumns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "familyId", headerName: "ID", width: 70 },
    {
      field: "",
      headerName: "Settings",
      width: 250,
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
              handleEdit(params.row.id);
            }}
          ></Button>

          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(params.row.id);
            }}
          ></Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<ShowChartIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(params.row.id);
            }}
          ></Button>
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
