import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../models/models";
import type { RootState } from "../app/store";

export interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: {
    userId: "f5e3b6a2-96b1-4a03-9cb9-d89b4e78c21a",
    userName: "Pauline Dugué",
    userEmailAddress: "",
    token: "",
    config: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    removeUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export const getCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
