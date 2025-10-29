import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addFamily } from "../slices/familySlice";
import { saveFamily } from "../apis/logs-api";

export const familyListenerMiddleware = createListenerMiddleware();

familyListenerMiddleware.startListening({
  actionCreator: addFamily,
  effect: async (action, listenerApi) => {
    const res = await saveFamily(action.payload);
    listenerApi.cancelActiveListeners();
    // const res = await addFamily();
    if (res) {
      console.log("EFFECTS", action.payload.name);
      //   listenerApi.dispatch(add FamilySuccess());
    }
  },
});
