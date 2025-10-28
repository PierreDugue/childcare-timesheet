import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addFamily } from "../slices/familySlice";

export const familyListenerMiddleware = createListenerMiddleware();

familyListenerMiddleware.startListening({
  actionCreator: addFamily,
  effect: async (action, listenerApi) => {
    console.log("EFFECTS", action.payload.name);
    listenerApi.cancelActiveListeners();

    // listenerApi.dispatch()
  },
});
