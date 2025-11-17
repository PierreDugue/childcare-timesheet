import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SignatureCanvas from "react-signature-canvas";

import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography } from "@mui/material";

import type { RootState } from "../../app/store";
import { newLogSchema, type LogFormInputs } from "../../models/models";
import { addLogs, selectAllFamily, selectFamilyById } from "../../slices/familySlice";

export function TimeLogForm() {
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>("");

  const selectFamilyByIdMemo = useMemo(() => selectFamilyById, []);
  const currentFamily = useSelector((state: RootState) =>
    selectFamilyByIdMemo(state, selectedFamilyId)
  );

  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<LogFormInputs>({
    resolver: zodResolver(newLogSchema),
  });

  const watchFamilyId = watch("family", "");
  const watchDate = watch("logs.date", "");

  const currentLog = currentFamily?.logs.find(
    (log) =>
      new Date(log.date).toDateString() ===
      new Date(watchDate).toDateString()
  );

  const signature = useRef<any>(null);
  const dispatch = useDispatch();

  const handleClearSignature = () => {
    signature.current?.clear();
    setValue("logs.signature", "");
  };

  const onSubmit: SubmitHandler<LogFormInputs> = (data) => {
    if (!currentFamily) return;

    const updatedLog = {
      family: currentFamily,
      log: {
        date: new Date(data.logs.date),
        startHour: data.logs.startHour || "",
        endHour: data.logs.endHour || "",
        comment: data.logs.comment || "",
        signature: data.logs.signature || "",
      },
    };

    dispatch(addLogs(updatedLog));
  };

  const handleSetCurrentTimeClick = (field: "logs.startHour" | "logs.endHour") => {
    const now = new Date();
    const formatted = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    setValue(field, formatted);
  };

  const families = useSelector(selectAllFamily);

  useEffect(() => {
    setSelectedFamilyId(watchFamilyId);

    if (!selectedFamilyId) return;

    if (currentLog) {
      setValue("logs.startHour", currentLog.startHour);
      setValue("logs.endHour", currentLog.endHour);
      setValue("logs.comment", currentLog.comment);

      if (currentLog.signature !== "") {
        setValue("logs.signature", currentLog.signature);
      } else {
        signature.current?.clear();
      }

      try {
        signature.current?.fromDataURL(currentLog.signature);
      } catch {
        console.warn("Could not load signature");
      }
    } else {
      setValue("logs.startHour", "");
      setValue("logs.endHour", "");
      setValue("logs.comment", "");
      setValue("logs.signature", "");
      signature.current?.clear();
    }
  }, [watchFamilyId, watchDate, selectedFamilyId, currentLog, setValue]);

  return (
    <div className="mx-auto max-w-xl p-6 rounded-2xl bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="font-sans">Family Time Log</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <FormControl fullWidth>
              <InputLabel id="family-label">Select Family</InputLabel>
              <Select
                labelId="family-label"
                defaultValue=""
                {...register("family")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {families.value.map((family) => (
                  <MenuItem key={family.familyId} value={family.familyId}>
                    {family.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.family && (
              <Typography variant="caption" color="error">{errors.family.message}</Typography>
            )}
          </div>

          <div className="flex flex-col">
            <TextField
              label="Date"
              type="date"
              defaultValue={new Date().toISOString().substring(0, 10)}
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("logs.date")}
              error={!!errors.logs?.date}
              helperText={errors.logs?.date?.message}
            />
          </div>
        </div>

        <div className="grid grid-flow-col grid-rows-4 gap-4">
          {/* <div className="flex flex-col"> */}
          <TextField
            className="row-span-1"
            label="Start Hour"
            type="time"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register("logs.startHour")}
          />
          <Button
            className="row-span-1"
            variant="outlined"
            size="small"
            onClick={() => handleSetCurrentTimeClick("logs.startHour")}
          >
            Now
          </Button>
          {/* </div> */}

          {/* <div className="flex flex-col"> */}
          <TextField
            className="row-span-1"
            label="End Hour"
            type="time"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register("logs.endHour")}
          />
          <Button
            className="row-span-1"
            variant="outlined"
            size="small"
            onClick={() => handleSetCurrentTimeClick("logs.endHour")}
          >
            Now
          </Button>
          {/* </div> */}
        </div>

        <TextField
          label="Comment"
          multiline
          rows={2}
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          placeholder="Add your comment..."
          {...register("logs.comment")}
        />

        <div>
          <Typography variant="subtitle2" className="mb-2">Signature</Typography>
          <Controller
            control={control}
            name="logs.signature"
            render={({ field }) => (
              <div>
                <SignatureCanvas
                  ref={signature}
                  penColor="black"
                  backgroundColor="#fafafa"
                  canvasProps={{
                    width: 400,
                    height: 200,
                    style: { border: "1px solid #ddd", borderRadius: "0.5rem" },
                  }}
                  onEnd={() => {
                    const data = signature.current?.toDataURL() || "";
                    field.onChange(data);
                  }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  className="mt-2"
                  onClick={handleClearSignature}
                >
                  Clear
                </Button>
              </div>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            variant="contained"
            disabled={currentLog && currentLog.signature !== ""}
          >
            Save
          </Button>
          <Button
            type="reset"
            variant="outlined"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
