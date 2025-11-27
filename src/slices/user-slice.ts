import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import type { Credentials, User } from "../models/models";

export interface UserState {
  currentUser: User;
  loading?: boolean;
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
    auth: (state, _action: PayloadAction<Credentials>) => {
      state.loading = true;
    },
    authSuccess: (state, action: PayloadAction<string>) => {
      state.currentUser.token = action.payload;
      state.loading = false;
    },
    authError: (state, _action: PayloadAction<string>) => {
      state.loading = false;
    },
    createUser: (state, _action: PayloadAction<Credentials>) => {
      state.loading = true;
    },
    createUserSuccess: (state) => {
      state.loading = false;
    },
    createUserError: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.currentUser = initialState.currentUser;
    },
  },
});

export const { auth, authSuccess, authError, createUser, createUserSuccess, createUserError, logout } =
  userSlice.actions;

export const getCurrentUser = (state: RootState) => state.user;

export default userSlice.reducer;
