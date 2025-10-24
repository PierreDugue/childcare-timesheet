import { useForm, type SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import type { LogFormInputs } from "../../models/models";
import {
  selectFamilies,
  selectfamilyById,
  type FamilyState,
} from "../../slices/familySlice";
import { useEffect } from "react";

export function TimeLogForm() {
  const { register, handleSubmit } = useForm<LogFormInputs>();
  const onSubmit: SubmitHandler<LogFormInputs> = (data) => console.log(data);

  const families = useSelector(selectFamilies);
  const family = useSelector((state: FamilyState) =>
    selectfamilyById({ family: state }, "fml_6c7d5e4f_03")
  );

  useEffect(() => {
    console.log(families.value.find((family) => family.familyId === "fml_6c7d5e4f_03"));
    console.log(family);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("family")}></select>
    </form>
  );
}
