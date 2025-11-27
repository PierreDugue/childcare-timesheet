import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SignatureCanvas from "react-signature-canvas";

import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";

import AddCircle from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router";
import type { RootState } from "../../app/store";
import { newLogSchema, type LogFormInputs } from "../../models/models";
import {
  addLogs,
  selectAllFamily,
  selectFamilyById,
} from "../../slices/family-slice";
import "./time-log-form.scss";

const buttonHeigh = "56px";

export function TimeLogForm() {
  const navigate = useNavigate();
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>("");

  const selectFamilyByIdMemo = useMemo(() => selectFamilyById, []);
  const currentFamily = useSelector((state: RootState) =>
    selectFamilyByIdMemo(state, selectedFamilyId)
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
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

  const handleSetCurrentTimeClick = (
    field: "logs.startHour" | "logs.endHour"
  ) => {
    const now = new Date();
    const formatted = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    setValue(field, formatted);
  };

  const handleReset = () => {
    // TODO: fix reset not clearing selected family
    reset({
      family: "",
      logs: {
        date: "",
        startHour: "",
        endHour: "",
        comment: "",
        signature: "",
      },
    });
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
    <div className="grid-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Family Time Log</h1>
        <div className="inline-2-block">
          <div>
            <FormControl>
              <InputLabel id="family-label">Select Family</InputLabel>
              <Select
                data-cy="time-log-family-select"
                label="Select family"
                labelId="family-label"
                defaultValue=""
                error={!!errors.family?.message}
                {...register("family")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {families.value.map((family) => (
                  <MenuItem
                    data-cy={`time-log-family-select-option-${family.familyId}`}
                    key={family.familyId}
                    value={family.familyId}
                  >
                    {family.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText data-cy="time-log-family-select-option-error">
                {errors?.family?.message}
              </FormHelperText>
            </FormControl>
          </div>

          <Button
            variant="contained"
            onClick={() => navigate("/settings")}
            sx={{ height: `${buttonHeigh}`, marginTop: "-21px" }}
          >
            <AddCircle />
          </Button>

          <div className="flex flex-col">
            <FormControl>
              <TextField
                data-cy="time-log-date-input"
                label="Date"
                type="date"
                defaultValue={new Date().toISOString().substring(0, 10)}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                {...register("logs.date")}
                error={!!errors.logs?.date}
                helperText={errors.logs?.date?.message ?? " "}
              />
            </FormControl>
          </div>
        </div>

        <div className="inline-2-block">
          <Button
            data-cy="time-log-set-start-now-button"
            className="row-span-1"
            variant="outlined"
            size="large"
            sx={{ height: `${buttonHeigh}` }}
            onClick={() => handleSetCurrentTimeClick("logs.startHour")}
          >
            Now
          </Button>
          <TextField
            className="row-span-1"
            label="Start Hour"
            type="time"
            slotProps={{
              input: { inputProps: { "data-cy": "time-log-start-hour-input" } },
              inputLabel: { shrink: true },
            }}
            {...register("logs.startHour")}
          />
        </div>
        <div className="inline-2-block">
          <Button
            data-cy="time-log-set-end-now-button"
            className="row-span-1"
            variant="outlined"
            size="large"
            sx={{ height: `${buttonHeigh}` }}
            onClick={() => handleSetCurrentTimeClick("logs.endHour")}
          >
            Now
          </Button>
          <TextField
            className="row-span-1"
            label="End Hour"
            type="time"
            slotProps={{
              input: { inputProps: { "data-cy": "time-log-end-hour-input" } },
              inputLabel: { shrink: true },
            }}
            {...register("logs.endHour")}
          />
        </div>

        <TextField
          label="Comment"
          data-cy="time-log-comment-input"
          multiline
          rows={2}
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          placeholder="Add your comment..."
          {...register("logs.comment")}
        />

        <div className="signature-container">
          <h2>Signature</h2>
          <Controller
            control={control}
            name="logs.signature"
            render={({ field }) => (
              <div>
                <SignatureCanvas
                  ref={signature}
                  penColor="black"
                  backgroundColor="#fafafa"
                  canvasProps={{ className: "canvas" }}
                  onEnd={() => {
                    const data = signature.current?.toDataURL() || "";
                    field.onChange(data);
                  }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  size="medium"
                  className="mt-2"
                  onClick={handleClearSignature}
                >
                  Clear
                </Button>
              </div>
            )}
          />
        </div>

        <div className="buttons-line">
          <Tooltip
            title={
              currentLog && currentLog.signature !== ""
                ? "You cannot update logs once it is signed"
                : ""
            }
          >
            <Button
              data-cy="time-log-save-log-button"
              type="submit"
              variant="contained"
              disabled={currentLog && currentLog.signature !== ""}
            >
              Save
            </Button>
          </Tooltip>
          <Button
            data-cy="time-log-reset-button"
            type="reset"
            variant="outlined"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
