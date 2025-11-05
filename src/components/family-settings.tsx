import { useEffect, useState } from "react";
import { FamilyTable } from "./family-table";
import { FamilyDialog } from "./logging/family-dialog";
import { Menu } from "./menu";
import { useDispatch } from "react-redux";
import { fetchFamilies } from "../slices/familySlice";

export function FamilySettings() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [familyId, setFamilyId] = useState<string>("");
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(fetchFamilies())
  }, [])

  return (
    <div>
      <Menu></Menu>
      <button onClick={handleAdd}>Add Family</button>
      <FamilyDialog
        id={familyId}
        open={isDialogOpen}
        onClose={handleClose}
      ></FamilyDialog>
      <FamilyTable onEdit={handleEdit}></FamilyTable>
    </div>
  );
}
