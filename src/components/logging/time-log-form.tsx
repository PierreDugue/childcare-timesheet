import { useForm, type SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import type { LogFormInputs } from "../../models/models";
import {
  selectAllFamily,
  selectFamilyById,
  type FamilyState,
} from "../../slices/familySlice";
import { useEffect } from "react";

export function TimeLogForm() {
  const { register, handleSubmit } = useForm<LogFormInputs>();
  const onSubmit: SubmitHandler<LogFormInputs> = (data) => console.log(data);

  const families = useSelector(selectAllFamily);
  const family = useSelector((state: FamilyState) =>
    selectFamilyById({ family: state }, "fml_6c7d5e4f_03")
  );

  useEffect(() => {
    console.log("all", families);
    console.log("byid", family);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("family")}></select>
    </form>
  );
}
