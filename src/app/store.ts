import { configureStore } from "@reduxjs/toolkit";
import familyReducer from "../slices/familySlice";
import userReducer from "../slices/userSlice";
import { familyListenerMiddleware } from "../effects/family-effects";

export const store = configureStore({
  reducer: {
    family: familyReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(familyListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
