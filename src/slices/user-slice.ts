import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Credentials, User } from "../models/models";
import type { RootState } from "../app/store";

export interface UserState {
  currentUser: User;
}

const initialState: UserState = {
  currentUser: {
    userName: "",
    userEmailAddress: "",
    token: "",
    config: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth: (_state, _action: PayloadAction<Credentials>) => { },
    authSuccess: (state, action: PayloadAction<string>) => {
      state.currentUser.token = action.payload;
    },
    authError: (_state, _action: PayloadAction<string>) => { },
    createUser: (_state, _action: PayloadAction<Credentials>) => { },
    logout: (state) => {
      state.currentUser = initialState.currentUser;
    }
  },
});

export const { auth, authSuccess, authError, createUser, logout } = userSlice.actions;

export const getCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
