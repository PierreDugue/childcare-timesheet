import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Family, FamilyLogs } from "../models/models";
import type { RootState } from "../app/store";

export interface FamilyState {
  value: Array<Family>;
}

const initialState: FamilyState = {
  value: [],
};

export const familySlice = createSlice({
  name: "family",
  initialState,
  reducers: {
    fetchFamilies: () => { },
    fecthAllFamiliesSuccess: (state, action: PayloadAction<Family[]>) => {
      state.value = action.payload
    },
    fecthAllFamiliesError: () => { },
    addFamily: (state, action: PayloadAction<Family>) => { },
    addFamilySuccess: (state, action: PayloadAction<Family>) => {
      state.value.push(action.payload);
    },
    addFamilyError: (state, action: PayloadAction<string>) => { },
    updateFamily: (
      state,
      action: PayloadAction<{ familyId: string; newName: string }>
    ) => { },
    updateFamilySuccess: (
      state,
      action: PayloadAction<Family>
    ) => {
      const familyToUpdate = state.value.findIndex((family) => {
        return family.familyId === action.payload.familyId
      })

      state.value[familyToUpdate] = action.payload;
    },
    updateFamilyError: (
      state,
      action: PayloadAction<{ familyId: string; newName: string }>
    ) => { },
    removeFamily: (state, action: PayloadAction<string>) => { },
    removeFamilySuccess: (state, action) => {
      state.value = state.value.filter((family) =>
        family.familyId !== action.payload
      )
    },
    removeFamilyError: (state, action: PayloadAction<string>) => { },
    addLogs: (
      state,
      action: PayloadAction<{ family: Family; log: FamilyLogs }>
    ) => { },
    addLogsSuccess: (state, action: PayloadAction<{ family: string } & FamilyLogs>) => {
      const { family, id, date, startHour, endHour, comment, signature } = action.payload;

      const currentFamily = state.value.find((f) => {
        return f.familyId === family
      });

      if (!currentFamily) return;

      const existingLog = currentFamily?.logs.find(
        (familyLog) =>
          new Date(familyLog.date).toString() === new Date(date).toString()
      );


      if (!existingLog) {
        currentFamily?.logs.push({
          id,
          date,
          startHour,
          endHour,
          comment,
          signature
        });
      } else {
        existingLog.startHour = startHour;
        existingLog.endHour = endHour;
        existingLog.signature = signature;
        existingLog.comment = comment;
      }
    },
    addLogsError: (state, action: PayloadAction<string>) => { },
    removeLog: (state,
      action: PayloadAction<{ logId: number, familyId: string }>) => {
    },
    removeLogSuccess: (state,
      action: PayloadAction<{ logId: number, familyId: string }>) => {
      const { logId, familyId } = action.payload;

      const currentFamily = state.value.find((f) => {
        return f.familyId === familyId
      });

      if (!currentFamily) return;

      currentFamily.logs = currentFamily?.logs.filter((log) => {
        return log.id !== logId
      });
    },
    removeLogError: () => { }
  },
});

export const {
  addFamily,
  fetchFamilies,
  fecthAllFamiliesSuccess,
  fecthAllFamiliesError,
  addFamilySuccess,
  addFamilyError,
  updateFamily,
  updateFamilySuccess,
  updateFamilyError,
  removeFamily,
  removeFamilySuccess,
  removeFamilyError,
  addLogs,
  addLogsSuccess,
  addLogsError,
  removeLog,
  removeLogSuccess,
  removeLogError
} = familySlice.actions;
export const selectAllFamily = (state: RootState) => state.family;
export const selectFamilyId = (state: RootState, familyId: string) => familyId;

export const selectFamilyById = createSelector(
  [selectAllFamily, selectFamilyId],
  (families, familyId) => {
    return families.value?.find((family) => family.familyId === familyId);
  }
);

export default familySlice.reducer;
