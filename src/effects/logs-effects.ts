import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addLogsAPI, removeLogAPI } from "../apis/logs-api";
import { addLogs, addLogsError, addLogsSuccess, removeLog, removeLogError, removeLogSuccess } from "../slices/familySlice";
import { showSnackbar } from "../slices/ui-slice";

export const logListenerMiddleware = createListenerMiddleware();

logListenerMiddleware.startListening({
  actionCreator: addLogs,
  effect: async (action, listenerApi) => {
    let res;

    if (action?.payload)
      res = await addLogsAPI(action.payload.family, action.payload.log);
    listenerApi.cancelActiveListeners();
    if (res?.status === 201 || res?.status === 200) {
      listenerApi.dispatch(addLogsSuccess(res?.data));
      listenerApi.dispatch(showSnackbar({
        message: "Log saved",
        severity: "success"
      }));
    } else {
      listenerApi.dispatch(addLogsError(res?.data.error));
      listenerApi.dispatch(showSnackbar({
        message: "Failed to save the log",
        severity: "error"
      }));
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
      listenerApi.dispatch(removeLogSuccess(action.payload));
      listenerApi.dispatch(showSnackbar({
        message: "Log removed",
        severity: "success"
      }));
    } else {
      listenerApi.dispatch(removeLogError(res?.data.error));
      listenerApi.dispatch(showSnackbar({
        message: "Failed to remove the log",
        severity: "error"
      }));
    }
  },
});


