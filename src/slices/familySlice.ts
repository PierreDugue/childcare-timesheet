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
  value: [
    {
      familyId: "f5e3b6a2-95b1-4a13-9cb9-d89b5e78c21b",
      userId: "f5e3b6a2-96b1-4a03-9cb9-d89b4e78c21a",
      name: "Famille Dubois",
      logs: [
        {
          date: new Date("2024-09-15"),
          startHour: "11:15",
          endHour: "15:30",
          signature: "PaulineD",
        },
        {
          date: new Date("2025-10-31"),
          startHour: "9:15",
          endHour: "16:30",
          signature: "PaulineD",
        },
      ] as FamilyLogs[],
    },
  ],
};

export const familySlice = createSlice({
  name: "family",
  initialState,
  reducers: {
    addFamily: (state, action: PayloadAction<Family>) => {
      const newfamily: Family = {
        familyId: action.payload.familyId,
        userId: action.payload.userId,
        name: action.payload.name,
        logs: action.payload.logs,
      };
      state.value.push(newfamily);
    },
    addFamilySuccess: (state, action: PayloadAction<string>) => {
      console.log("Family added with ID:", action.payload);
    },
    updateFamily: (
      state,
      action: PayloadAction<{ familyId: string; newName: string }>
    ) => {
      const familyToUpdate = state.value.find(
        (family) => family.familyId === action.payload.familyId
      );
      if (familyToUpdate) {
        familyToUpdate.name = action.payload.newName;
      }
    },
    removeFamily: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(
        (family) => family.familyId !== action.payload
      );
    },
    addLogs: (
      state,
      action: PayloadAction<{ familyId: string; log: FamilyLogs }>
    ) => {
      const { familyId, log } = action.payload;
      const family = state.value.find((f) => f.familyId === familyId);
      const existingLog = family?.logs.find(
        (familyLog) =>
          new Date(familyLog.date).toString() === new Date(log.date).toString()
      );

      if (!family) return;
      if (!existingLog) {
        family?.logs.push(log);
      } else {
        existingLog.startHour = log.startHour;
        existingLog.endHour = log.endHour;
        existingLog.signature = log.signature;
      }
    },
  },
});

export const {
  addFamily,
  addFamilySuccess,
  updateFamily,
  removeFamily,
  addLogs,
} = familySlice.actions;
export const selectAllFamily = (state: RootState) => state.family;
export const selectFamilyId = (state: RootState, familyId: string) => familyId;

export const selectFamilyById = createSelector(
  [selectAllFamily, selectFamilyId],
  (families, familyId) => {
    console.log("families by id", families, familyId);
    return families.value?.find((family) => family.familyId === familyId);
  }
);

export const selectAllFamilyByUserId = createSelector(
  [selectAllFamily, (_: RootState, userId: string) => userId],
  (families, userId) => {
    return families.value?.filter((family) => family.userId === userId);
  }
);

export const selectAllLogsByFamilyId = createSelector(
  [selectAllFamilyByUserId, (_: RootState, familyId: string) => familyId],
  (families, familyId) => {
    return families.family?.value?.filter(
      (family) => family.userId === familyId
    );
  }
);

export default familySlice.reducer;
