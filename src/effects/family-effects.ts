import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addLogsAPI, fecthAllFamiliesAPI, removeFamilyAPI, saveFamilyAPI, updateFamilyNameAPI } from "../apis/logs-api";
import { addFamily, addFamilyError, addFamilySuccess, addLogs, addLogsError, addLogsSuccess, fecthAllFamiliesSuccess, fetchFamilies, removeFamily, removeFamilyError, removeFamilySuccess, updateFamily, updateFamilyError, updateFamilySuccess } from "../slices/familySlice";

export const familyListenerMiddleware = createListenerMiddleware();

familyListenerMiddleware.startListening({
  actionCreator: addFamily,
  effect: async (action, listenerApi) => {
    console.log(action);

    let res;
    if (action?.payload)
      res = await saveFamilyAPI(action.payload);

    listenerApi.cancelActiveListeners();
    if (res?.status === 201 && action?.payload) {
      listenerApi.dispatch(fetchFamilies());
      listenerApi.dispatch(addFamilySuccess(action?.payload));
    } else {
      listenerApi.dispatch(addFamilyError(res?.data.error));
    }
  },
});

familyListenerMiddleware.startListening({
  actionCreator: updateFamily,
  effect: async (action, listenerApi) => {

    let res;
    if (action?.payload)
      res = await updateFamilyNameAPI(action.payload.familyId, action.payload.newName);

    listenerApi.cancelActiveListeners();
    if (res?.status === 200 && action?.payload) {
      listenerApi.dispatch(fetchFamilies());
      listenerApi.dispatch(updateFamilySuccess(action?.payload));
    } else {
      listenerApi.dispatch(updateFamilyError(res?.data.error));
    }
  },
});

familyListenerMiddleware.startListening({
  actionCreator: fetchFamilies,
  effect: async (action, listenerApi) => {
    const res = await fecthAllFamiliesAPI();
    listenerApi.cancelActiveListeners();
    if (res?.status === 201 || res?.status === 200) {
      listenerApi.dispatch(fecthAllFamiliesSuccess(res.data));
    }
  },
});

familyListenerMiddleware.startListening({
  actionCreator: removeFamily,
  effect: async (action, listenerApi) => {
    let res;
    if (action?.payload)
      res = await removeFamilyAPI(action.payload);
    listenerApi.cancelActiveListeners();
    if (res?.status === 204 || res?.status === 200) {
      listenerApi.dispatch(fetchFamilies());
      listenerApi.dispatch(removeFamilySuccess(action.payload));
    } else {
      listenerApi.dispatch(removeFamilyError(res?.data.error))
    }
  },
});

familyListenerMiddleware.startListening({
  actionCreator: addLogs,
  effect: async (action, listenerApi) => {
    let res;
    if (action?.payload) 
      res = await addLogsAPI(action.payload.family, action.payload.log);
    listenerApi.cancelActiveListeners();
    if (res?.status === 204 || res?.status === 200) {
      listenerApi.dispatch(addLogsSuccess());
    } else {
      listenerApi.dispatch(addLogsError())
    }
  },
});
