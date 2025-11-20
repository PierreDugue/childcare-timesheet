import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { FamilyFormInputs } from "../../models/models";
import {
  addFamily,
  selectFamilyById,
  updateFamily,
} from "../../slices/family-slice";

export function FamilyDialog(props: {
  id: string;
  open: boolean;
  onClose: () => void;
}) {
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
        familyId: "",
        logs: [],
      }))

    reset({ name: "" });
    handleClose();
  };

  return (
    <Dialog open={props?.open} onClose={handleClose}>
      <DialogTitle>
        {family ? <h3>Update family</h3> : <h3>Add family</h3>}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            {...register("name")}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit">Save</Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
