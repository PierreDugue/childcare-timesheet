import { configureStore } from "@reduxjs/toolkit";
import { familyListenerMiddleware } from "./family-effects";
import familyReducer from "../slices/family-slice";
import uiReducer from "../slices/ui-slice";

export function createTestStore() {
  return configureStore({
    reducer: {
      family: familyReducer,
      ui: uiReducer,
    },
    middleware: (getDefault) =>
      getDefault().prepend(familyListenerMiddleware.middleware),
  });
}