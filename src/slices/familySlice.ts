import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { family, familyLogs } from "../models/models";
import { v4 as uuidv4 } from "uuid";
import type { RootState } from "../app/store";

export interface FamilyState {
  value: Array<family>;
}

const initialState: FamilyState = {
  value: [
    // --- Famille 1 : Avec des logs enregistrés ---
    {
      familyId: "fml_4a3b1d9c_01",
      userId: "user_p4_7720",
      name: "Famille Dubois",
      logs: [
        {
          startHour: new Date("2024-10-01T09:00:00Z"),
          endHour: new Date("2024-10-01T17:30:00Z"),
          signature: "PaulineD",
        },
        {
          startHour: new Date("2024-10-05T14:00:00Z"),
          endHour: new Date("2024-10-05T16:00:00Z"),
          signature: "Admin",
        },
      ] as familyLogs[],
    },
    {
      familyId: "fml_4a3b1d9c_02",
      userId: "user_p4_7720",
      name: "Famille Test",
      logs: [
        {
          startHour: new Date("2024-10-01T09:00:00Z"),
          endHour: new Date("2024-10-01T17:30:00Z"),
          signature: "PaulineD",
        },
        {
          startHour: new Date("2024-10-05T14:00:00Z"),
          endHour: new Date("2024-10-05T16:00:00Z"),
          signature: "Admin",
        },
      ] as familyLogs[],
    },

    // --- Famille 2 : Sans logs (nouvelle famille) ---
    {
      familyId: "fml_b8e2f0a1_02",
      userId: "user_a9_3151",
      name: "Famille Martin",
      logs: [] as familyLogs[],
    },

    // --- Famille 3 : Avec un seul log récent ---
    {
      familyId: "fml_6c7d5e4f_03",
      userId: "user_z1_9088",
      name: "Famille LeBlanc",
      logs: [
        {
          startHour: new Date("2024-10-23T10:30:00Z"),
          endHour: new Date("2024-10-23T18:00:00Z"),
          signature: "JeanneL",
        },
      ] as familyLogs[],
    },
  ],
};

type AddFamilyPayload = {
  name: string;
  userId: string;
};

export const familySlice = createSlice({
  name: "family",
  initialState,
  reducers: {
    addFamily: (state, action: PayloadAction<AddFamilyPayload>) => {
      const newfamily: family = {
        familyId: uuidv4(),
        userId: action.payload.userId,
        name: action.payload.name,
        logs: [],
      };
      state.value.push(newfamily);
    },
    removeFamily: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(
        (family) => family.familyId !== action.payload
      );
    },
    addLogs: (
      state,
      action: PayloadAction<{ familyId: string; log: familyLogs }>
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
      }
    },
  },
});

export const { addFamily, removeFamily, addLogs } = familySlice.actions;
export const selectAllFamily = (state: RootState) => state.family;
export const selectFamilyId = (state: RootState, familyId: string) => familyId;

export const selectFamilyById = createSelector(
  [selectAllFamily, selectFamilyId],
  (families, familyId) => {
    console.log("families", families, familyId);
    return families.family.value?.find(
      (family) => family.familyId === familyId
    );
  }
);

export const selectAllFamilyByUserId = createSelector(
  [selectAllFamily, (_: RootState, userId: string) => userId],
  (families, userId) => {
    return families.family.value.filter((family) => family.userId === userId);
  }
);

export const selectAllLogsByFamilyId = createSelector(
  [selectAllFamilyByUserId, (_: RootState, familyId: string) => familyId],
  (families, familyId) => {
    return families.family.value.filter((family) => family.userId === familyId);
  }
);

export default familySlice.reducer;
