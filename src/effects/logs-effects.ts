import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addLogs, addLogsError, addLogsSuccess } from "../slices/familySlice";
import { addLogsAPI } from "../apis/logs-api";

export const logListenerMiddleware = createListenerMiddleware();

// logListenerMiddleware.startListening({
//   actionCreator: addLogs,
//   effect: async (action, listenerApi) => {
//     console.log('effect', action.payload, listenerApi);
//     const res = await saveFamily(action.payload);
//     listenerApi.cancelActiveListeners();
//     if (res?.status === 201) {
//       listenerApi.dispatch(addFamilySuccess(action.payload.familyId));
//     }
//   },
// });

logListenerMiddleware.startListening({
  actionCreator: addLogs,
  effect: async (action, listenerApi) => {
    let res;

    if (action?.payload)
      res = await addLogsAPI(action.payload.family, action.payload.log);
    listenerApi.cancelActiveListeners();
    if (res?.status === 204 || res?.status === 200) {
      listenerApi.dispatch(addLogsSuccess(res?.data));
    } else {
      listenerApi.dispatch(addLogsError())
    }
  },
});