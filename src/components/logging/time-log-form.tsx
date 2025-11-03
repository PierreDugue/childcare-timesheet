import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SignatureCanvas from "react-signature-canvas";
import { newLogSchema, type LogFormInputs } from "../../models/models";
import {
  addLogs,
  selectAllFamily,
  selectFamilyById,
} from "../../slices/familySlice";
import type { RootState } from "../../app/store";
import { zodResolver } from "@hookform/resolvers/zod";

export function TimeLogForm() {
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>("");
  // const [selectedDate, setSelectedFDate] = useState<Date>(new Date());
  const currentLog = useSelector((state: RootState) =>
    selectFamilyById(state, selectedFamilyId)
  );

  const { register, handleSubmit, setValue, watch, control } =
    useForm<LogFormInputs>({
      resolver: zodResolver(newLogSchema),
    });
  const watchFamilyId = watch("family", "");
  const watchDate = watch("logs.date", "");

  const signature = useRef(null);
  const handleClearSignature = () => {
    if (signature.current) signature.current.clear();
    setValue("logs.signature", "");
  };
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<LogFormInputs> = (data) => {
    console.log("Submitting log data:", data);
    dispatch(
      addLogs({
        familyId: data.family,
        log: {
          date: new Date(data.logs.date),
          startHour: data.logs.startHour || "",
          endHour: data.logs.endHour || "",
          comment: data.logs.comment || "",
          signature: data.logs.signature || "",
        },
      })
    );
  };

  const families = useSelector(selectAllFamily);

  useEffect(() => {
    setSelectedFamilyId(watchFamilyId);

    if (selectedFamilyId) {
      const foundLog = currentLog?.logs.find(
        (log) =>
          new Date(log.date).toDateString() ===
          new Date(watchDate).toDateString()
      );

      if (foundLog) {
        setValue("logs.startHour", foundLog.startHour);
        setValue("logs.endHour", foundLog.endHour);
        setValue("logs.comment", foundLog.comment);
        setValue("logs.signature", foundLog.signature);
        try {
          signature.current?.fromDataURL(foundLog.signature);
        } catch (error) {
          console.warn("Failed to load signature:", error);
        }
      } else {
        setValue("logs.startHour", "");
        setValue("logs.endHour", "");
        setValue("logs.comment", "");
        setValue("logs.signature", "");
        signature.current?.clear();
      }
    }
  }, [watchFamilyId, watchDate, selectedFamilyId, currentLog, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("family")}>
        {families.value.map((family) => (
          <option key={family.familyId} value={family.familyId}>
            {family.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        defaultValue={new Date().toISOString().substring(0, 10)}
        {...register("logs.date")}
      />
      <input type="time" {...register("logs.startHour")} />
      <input type="time" {...register("logs.endHour")} />
      <input type="text" {...register("logs.comment")} />
      <Controller
        control={control}
        name="logs.signature"
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
