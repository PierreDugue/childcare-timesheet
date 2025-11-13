import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addLogsAPI, removeLogAPI } from "../apis/logs-api";
import { addLogs, addLogsError, addLogsSuccess, removeLog, removeLogError, removeLogSuccess } from "../slices/familySlice";

export const logListenerMiddleware = createListenerMiddleware();

logListenerMiddleware.startListening({
  actionCreator: addLogs,
  effect: async (action, listenerApi) => {
    let res;

    if (action?.payload)
      res = await addLogsAPI(action.payload.family, action.payload.log);
    listenerApi.cancelActiveListeners();
    if (res?.status === 201 || res?.status === 200) {
      console.log('rees', res?.data)
      listenerApi.dispatch(addLogsSuccess(res?.data));
    } else {
      listenerApi.dispatch(addLogsError(res?.data.error))
    }
  },
});

logListenerMiddleware.startListening({
  actionCreator: removeLog,
  effect: async (action, listenerApi) => {
    let res;

    if (action?.payload)
      res = await removeLogAPI(action.payload.logId);
    listenerApi.cancelActiveListeners();
    if (res?.status === 204) {
      console.log('rees', res?.data)
      listenerApi.dispatch(removeLogSuccess(action.payload));
    } else {
      listenerApi.dispatch(removeLogError(res?.data.error))
    }
  },
});


