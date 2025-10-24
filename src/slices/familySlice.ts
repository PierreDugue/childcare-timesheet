import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { family, familyLogs } from "../models/models";
import { v4 as uuidv4 } from "uuid";
import type { RootState } from "../app/store";

export interface FamilyState {
  value: family[];
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
          startDate: new Date("2024-10-01T09:00:00Z"),
          endDate: new Date("2024-10-01T17:30:00Z"),
          signature: "PaulineD",
        },
        {
          startDate: new Date("2024-10-05T14:00:00Z"),
          endDate: new Date("2024-10-05T16:00:00Z"),
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
          startDate: new Date("2024-10-23T10:30:00Z"),
          endDate: new Date("2024-10-23T18:00:00Z"),
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
      state.value.filter((family) => family.familyId !== action.payload);
    },
  },
});

export const { addFamily, removeFamily } = familySlice.actions;
export const selectFamilies = (state: RootState) => state.family;
export const selectAllFamilies = createSelector(
  [selectFamilies],
  (family) => family // Retourne simplement le tableau de familles
);

export const selectfamilyById = createSelector(
  [selectFamilies, (state: RootState, familyId: string) => familyId],
  (families, familyId) =>
    families.value?.find((family) => family.familyId === familyId)
);
export default familySlice.reducer;
