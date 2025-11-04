import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
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
import styles from "./TimeLogForm.module.scss";

export function TimeLogForm() {
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
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

  const handleSetCurrentTimeClick = (
    field: "logs.startHour" | "logs.endHour"
  ) => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const formatted = `${hours}:${minutes}`;

    setCurrentTime(formatted);
    setValue(field, formatted);
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
    <Paper
      elevation={4}
      className={`mx-auto max-w-xl p-6 rounded-2xl ${styles.formContainer}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        backgroundColor: "white",
        border: "1px solid #e5e7eb",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" fontWeight={600}>
          Family Time Log
        </Typography>

        {/* FAMILY SELECT */}
        <FormControl fullWidth>
          <InputLabel>Select Family</InputLabel>
          <Select label="Select Family" {...register("family")} defaultValue="">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {families.value.map((family) => (
              <MenuItem key={family.familyId} value={family.familyId}>
                {family.name}
              </MenuItem>
            ))}
          </Select>
          {errors.family && (
            <Typography variant="caption" color="error">
              {errors.family.message}
            </Typography>
          )}
        </FormControl>

        {/* DATE */}
        <TextField
          type="date"
          label="Date"
          slotProps={{ inputLabel: { shrink: true } }}
          defaultValue={new Date().toISOString().substring(0, 10)}
          {...register("logs.date")}
          error={!!errors.logs?.date}
          helperText={errors.logs?.date?.message}
        />

        {/* HOURS GRID */}
        <Grid container spacing={2}>
          <Grid>
            <TextField
              type="time"
              label="Start Hour"
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("logs.startHour")}
            />

            <Button
              size="small"
              variant="outlined"
              onClick={() => handleSetCurrentTimeClick("logs.startHour")}
              sx={{ mt: 1 }}
            >
              Now
            </Button>
          </Grid>

          <Grid>
            <TextField
              type="time"
              label="End Hour"
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("logs.endHour")}
            />

            <Button
              size="small"
              variant="outlined"
              onClick={() => handleSetCurrentTimeClick("logs.endHour")}
              sx={{ mt: 1 }}
            >
              Now
            </Button>
          </Grid>
        </Grid>

        {/* COMMENT */}
        <TextField
          label="Comment"
          placeholder="Add your comment..."
          multiline
          rows={2}
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("logs.comment")}
        />

        {/* SIGNATURE */}
        <Box>
          <Typography variant="subtitle2" mb={1}>
            Signature
          </Typography>

          <Controller
            control={control}
            name="logs.signature"
            render={({ field }) => (
              <Box>
                <SignatureCanvas
                  ref={signature}
                  penColor="black"
                  backgroundColor="#fafafa"
                  canvasProps={{
                    width: 400,
                    height: 200,
                    style: {
                      border: "1px solid #ddd",
                      borderRadius: "0.5rem",
                    },
                  }}
                  onEnd={() => {
                    const dataUrl = signature.current?.toDataURL() || "";
                    field.onChange(dataUrl);
                  }}
                />

                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={handleClearSignature}
                  sx={{ mt: 1 }}
                >
                  Clear
                </Button>
              </Box>
            )}
          />
        </Box>

        {/* BUTTONS */}
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Tooltip
            title={
              currentLog && currentLog.signature !== ""
                ? "You cannot update logs once it is signed"
                : ""
            }
          >
            <span>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={currentLog && currentLog.signature !== ""}
              >
                Save
              </Button>
            </span>
          </Tooltip>

          <Button type="reset" variant="outlined" color="secondary">
            Reset
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
