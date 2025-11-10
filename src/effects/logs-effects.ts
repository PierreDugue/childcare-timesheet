import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addLogsAPI } from "../apis/logs-api";
import { addLogs, addLogsError, addLogsSuccess } from "../slices/familySlice";

export const logListenerMiddleware = createListenerMiddleware();

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
      listenerApi.dispatch(addLogsError(res?.data.error))
    }
  },
});
