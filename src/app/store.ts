import { configureStore } from "@reduxjs/toolkit";
import familyReducer from "../slices/familySlice";
import userReducer from "../slices/userSlice";
import { familyListenerMiddleware } from "../effects/family-effects";
import { logListenerMiddleware } from "../effects/logs-effects";
import { authListenerMiddleware } from "../effects/user-effects";

export const store = configureStore({
  reducer: {
    family: familyReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      familyListenerMiddleware.middleware,
      logListenerMiddleware.middleware,
      authListenerMiddleware.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
