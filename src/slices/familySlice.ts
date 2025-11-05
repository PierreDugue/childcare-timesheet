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
    fecthAllFamiliesError: () => {},
    addFamily: () => {
    },
    addFamilySuccess: (state, action: PayloadAction<Family>) => {
      console.log("Family added with ID:", action.payload);
      state.value.push(action.payload);
    },
    addFamilyError: (state, action: PayloadAction<string>) => {
      console.log(action.payload)
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

      console.log('existingLogs', existingLog, log);

      if (!family) return;
      if (!existingLog) {
        family?.logs.push(log);
      } else {
        existingLog.startHour = log.startHour;
        existingLog.endHour = log.endHour;
        existingLog.signature = log.signature;
        existingLog.comment = log.comment;
      }
    },
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

// export const selectAllLogsByFamilyId = createSelector(
//   [selectAllFamilyByUserId, (_: RootState, familyId: string) => familyId],
//   (families, familyId) => {
//     return families.family?.value?.filter(
//       (family) => family.userId === familyId
//     );
//   }
// );

export default familySlice.reducer;
