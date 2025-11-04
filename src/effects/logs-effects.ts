import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addLogs } from "../slices/familySlice";

export const logListenerMiddleware = createListenerMiddleware();

logListenerMiddleware.startListening({
  actionCreator: addLogs,
  effect: async (action, listenerApi) => {
    console.log('effect', action.payload, listenerApi);
    // const res = await saveFamily(action.payload);
    // listenerApi.cancelActiveListeners();
    // if (res?.status === 201) {
    //   listenerApi.dispatch(addFamilySuccess(action.payload.familyId));
    // }
  },
});
