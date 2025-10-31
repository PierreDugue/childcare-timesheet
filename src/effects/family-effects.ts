import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addFamily, addFamilySuccess } from "../slices/familySlice";
import { saveFamily } from "../apis/logs-api";

export const familyListenerMiddleware = createListenerMiddleware();

familyListenerMiddleware.startListening({
  actionCreator: addFamily,
  effect: async (action, listenerApi) => {
    const res = await saveFamily(action.payload);
    listenerApi.cancelActiveListeners();
    if (res?.status === 201) {
      listenerApi.dispatch(addFamilySuccess(action.payload.familyId));
    }
  },
});
