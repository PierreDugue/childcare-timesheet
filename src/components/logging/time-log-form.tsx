import { Box, Button, Tooltip } from "@mui/material";
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
  const currentFamily = useSelector((state: RootState) => {
    console.log("selectFamilyById", selectFamilyById(state, selectedFamilyId));
    return selectFamilyById(state, selectedFamilyId);
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<LogFormInputs>({
    resolver: zodResolver(newLogSchema),
  });
  const watchFamilyId = watch("family", "");
  const watchDate = watch("logs.date", "");
  const currentLog = currentFamily?.logs.find(
    (log) =>
      new Date(log.date).toDateString() === new Date(watchDate).toDateString()
  );
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
      if (currentLog) {
        setValue("logs.startHour", currentLog.startHour);
        setValue("logs.endHour", currentLog.endHour);
        setValue("logs.comment", currentLog.comment);
        setValue("logs.signature", currentLog.signature);
        try {
          signature.current?.fromDataURL(currentLog.signature);
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
      {errors.logs?.date && <span>{errors.logs.date.message}</span>}
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
      <Tooltip
        title={
          currentLog && currentLog.signature !== ""
            ? "You cannot update logs once it is signed"
            : ""
        }
      >
        <button
          type="submit"
          disabled={currentLog && currentLog.signature !== ""}
        >
          Save
        </button>
      </Tooltip>
      <button type="reset" value="Reset">
        Reset
      </button>
    </form>
  );
}
