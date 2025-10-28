import { configureStore } from "@reduxjs/toolkit";
import familyReducer from "../slices/familySlice";
import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    family: familyReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
