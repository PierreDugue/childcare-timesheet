import { useState } from "react";
import { FamilyDialog } from "./family-dialog";
import { Button } from "@mui/material";
import { Menu } from "../navigation/menu";
import { FamilyTable } from "./family-table";
import './family-settings.scss'

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
      <div className="button-container">
        <Button data-cy="add-family-button" className="button" variant="outlined" onClick={handleAdd}>Add Family</Button>
      </div>
      <FamilyDialog
        id={familyId}
        open={isDialogOpen}
        onClose={handleClose}
      ></FamilyDialog>
      <FamilyTable onEdit={handleEdit}></FamilyTable>
    </div>
  );
}
