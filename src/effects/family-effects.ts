import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addFamily, addFamilyError, addFamilySuccess, fecthAllFamiliesSuccess, fetchFamilies } from "../slices/familySlice";
import { fecthAllFamilies, saveFamily } from "../apis/logs-api";

export const familyListenerMiddleware = createListenerMiddleware();

familyListenerMiddleware.startListening({
  actionCreator: addFamily,
  effect: async (action, listenerApi) => {
    let res;
    if (action?.payload)
      res = await saveFamily(action.payload);

    listenerApi.cancelActiveListeners();
    if (res?.status === 201 && action?.payload) {
      listenerApi.dispatch(addFamilySuccess(action.payload));
    } else {
      listenerApi.dispatch(addFamilyError(res?.data.error));
    }
  },
});

familyListenerMiddleware.startListening({
  actionCreator: fetchFamilies,
  effect: async (action, listenerApi) => {
    const res = await fecthAllFamilies();
    listenerApi.cancelActiveListeners();
    if (res?.status === 201 || res?.status === 200) {
      listenerApi.dispatch(fecthAllFamiliesSuccess(res.data));
    }
  },
});
