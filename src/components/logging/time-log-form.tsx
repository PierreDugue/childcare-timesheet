import { useEffect, useRef } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { LogFormInputs } from "../../models/models";
import { addLogs, selectAllFamily } from "../../slices/familySlice";
import SignatureCanvas from "react-signature-canvas";
import { Box, Button } from "@mui/material";

export function TimeLogForm() {
  const { register, handleSubmit, setValue, control } =
    useForm<LogFormInputs>();
  const signature = useRef(null);
  const handleClearSignature = () => {
    if (signature.current) signature.current.clear();
    setValue("signature", "");
  };
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
          comment: data.comment ?? "",
          signature: data.signature,
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
      <Controller
        control={control}
        name="signature"
        render={({ field }) => (
          <Box>
            <SignatureCanvas
              ref={signature}
              penColor="black"
              backgroundColor="#f5f5f5"
              canvasProps={{
                width: 400,
                height: 200,
                style: { border: "1px solid #ccc", borderRadius: "8px" },
              }}
              onEnd={() => {
                const dataUrl = signature.current?.toDataURL() || "";
                field.onChange(dataUrl);
              }}
            />
            <Box sx={{ mt: 1 }}>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleClearSignature}
              >
                Clear
              </Button>
            </Box>
          </Box>
        )}
      />
      <button type="submit">Save</button>
      <button type="reset" value="Reset">
        Reset
      </button>
    </form>
  );
}
