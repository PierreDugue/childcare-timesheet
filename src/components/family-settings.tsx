import { useState } from "react";
import { FamilyTable } from "./family-table";
import { FamilyDialog } from "./logging/family-dialog";
import { Menu } from "./menu";

export function FamilySettings() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [familyId, setFamilyId] = useState<string>("");

  const handleAdd = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Menu></Menu>
      <button onClick={handleAdd}>Add Family</button>
      <FamilyDialog
        id={familyId}
        open={isDialogOpen}
        onClose={handleClose}
      ></FamilyDialog>
      <FamilyTable></FamilyTable>
    </div>
  );
}
