import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import type { RootState } from "../../app/store";
import type { FamilyFormInputs } from "../../models/models";
import {
  addFamily,
  selectFamilyById,
  updateFamily,
} from "../../slices/familySlice";
import { getCurrentUser } from "../../slices/userSlice";

export function FamilyDialog(props: {
  id: string;
  open: boolean;
  onClose: () => void;
}) {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const family = useSelector((state: RootState) =>
    selectFamilyById(state, props?.id)
  );
  const { register, handleSubmit, reset } = useForm<FamilyFormInputs>({
    values: {
      familyId: props?.id,
      name: props?.id !== "" && family ? family.name : "",
    },
  });

  const handleClose = () => {
    props.onClose();
  };

  const onSubmit: SubmitHandler<FamilyFormInputs> = (data) => {
    if (props?.id !== "") {
      dispatch(updateFamily({ familyId: data.familyId, newName: data.name }));
      handleClose();
      return;
    }

    dispatch(
      addFamily({
        name: data.name,
        familyId: uuidv4(),
        userId: currentUser?.userId || "",
        logs: [],
      })
    );
    reset({ name: "" });
    handleClose();
  };

  return (
    <Dialog open={props?.open} onClose={handleClose}>
      <DialogTitle>
        {family ? <h3>Update family</h3> : <h3>Add family</h3>}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("name")} />
          <button type="submit">Save</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
