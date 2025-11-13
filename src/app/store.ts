import { configureStore } from "@reduxjs/toolkit";
import familyReducer from "../slices/familySlice";
import userReducer from "../slices/userSlice";
import { familyListenerMiddleware } from "../effects/family-effects";
import { logListenerMiddleware } from "../effects/logs-effects";
import { authListenerMiddleware } from "../effects/user-effects";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["currentUser"],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    family: familyReducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(
      familyListenerMiddleware.middleware,
      logListenerMiddleware.middleware,
      authListenerMiddleware.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
