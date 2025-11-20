import { useState } from "react";
import { FamilyDialog } from "./family-dialog";
import { Button } from "@mui/material";
import { Menu } from "../navigation/menu";
import { FamilyTable } from "./family-table";

export function FamilySettings() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [familyId, setFamilyId] = useState<string>("");

  const handleAdd = () => {
    setFamilyId("");
    setIsDialogOpen(true);
  };

  const handleEdit = (familyId: string) => {
    setFamilyId(familyId);
    setIsDialogOpen(true);
  };


  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Menu></Menu>
      <Button  variant="contained" onClick={handleAdd}>Add Family</Button>
      <FamilyDialog
        id={familyId}
        open={isDialogOpen}
        onClose={handleClose}
      ></FamilyDialog>
      <FamilyTable onEdit={handleEdit}></FamilyTable>
    </div>
  );
}
