import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addFamily,
  selectFamilyById,
  type FamilyState,
} from "../../slices/familySlice";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { FamilyFormInputs } from "../../models/models";
import { getCurrentUser } from "../../slices/userSlice";
import type { RootState } from "../../app/store";

export function FamilyDialog(props: {
  id: string;
  open: boolean;
  onClose: () => void;
}) {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<FamilyFormInputs>();
  const family = useSelector((state: RootState) =>
    selectFamilyById(state, props?.id)
  );

  const handleClose = () => {
    props.onClose();
  };

  const onSubmit: SubmitHandler<FamilyFormInputs> = (data) => {
    console.log(data, currentUser?.userId);
    dispatch(
      addFamily({
        name: data.name,
        userId: currentUser?.userId || "",
      })
    );
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
