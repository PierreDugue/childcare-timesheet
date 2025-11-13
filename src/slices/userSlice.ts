import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Credentials, User } from "../models/models";
import type { RootState } from "../app/store";

export interface UserState {
  currentUser: User;
}

const initialState: UserState = {
  currentUser: {
    userName: "Pierre Dugué",
    userEmailAddress: "",
    token: "",
    config: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<Credentials>) => {

    },
    authSuccess: (state, action: PayloadAction<string>) => {
      state.currentUser.token = action.payload;
      console.log('Authenticated succesfully')
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = initialState.currentUser;
    }
  },
});

export const { auth, authSuccess, addUser, logout } = userSlice.actions;

export const getCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
