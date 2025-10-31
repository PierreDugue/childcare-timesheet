import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { LogFormInputs } from "../../models/models";
import {
  addLogs,
  selectAllFamily
} from "../../slices/familySlice";

export function TimeLogForm() {
  const { register, handleSubmit } = useForm<LogFormInputs>();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<LogFormInputs> = (data) => {
    console.log("Submitting log data:", data);
    dispatch(
      addLogs({
        familyId: data.family,
        log: {
          date: new Date(data.logs.date),
          startHour: data.logs.startHour,
          endHour: data.logs.endHour,
          signature: data.comment ?? "",
        },
      })
    );
  };

  const families = useSelector(selectAllFamily);

  useEffect(() => {
    console.log("all", families);

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
