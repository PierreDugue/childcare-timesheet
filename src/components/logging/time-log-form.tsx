import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { LogFormInputs } from "../../models/models";
import {
    addLogs,
    selectAllFamily,
    selectFamilyById
} from "../../slices/familySlice";

export function TimeLogForm() {
  const { register, handleSubmit } = useForm<LogFormInputs>();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<LogFormInputs> = (data) => {
    dispatch(
      addLogs({
        familyId: data.family,
        log: {
          date: data.logs.date,
          startHour: data.logs.startHour,
          endHour: data.logs.endHour,
          signature: data.comment ?? "",
        },
      })
    );
  };

  const families = useSelector(selectAllFamily);
  const family = useSelector((state: RootState) =>
    selectFamilyById(state, "fml_6c7d5e4f_03")
  );

  useEffect(() => {
    console.log("all", families);
    console.log("byid", family);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("family")}>
        {families.value.map((family) => (
          <option key={family.familyId} value={family.familyId}>
            {family.name}
          </option>
        ))}
      </select>
      <input type="date" {...register("logs.date")} />
      <input type="time" {...register("logs.startHour")} />
      <input type="time" {...register("logs.endHour")} />
      <input type="text" {...register("comment")} />
      <button type="submit">Save</button>
      <button type="reset" value="Reset">
        Reset
      </button>
    </form>
  );
}
