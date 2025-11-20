import { createListenerMiddleware } from "@reduxjs/toolkit";
import { fecthAllFamiliesAPI, removeFamilyAPI, saveFamilyAPI, updateFamilyNameAPI } from "../apis/logs-api";
import { addFamily, addFamilyError, addFamilySuccess, fecthAllFamiliesSuccess, fetchFamilies, removeFamily, removeFamilyError, removeFamilySuccess, updateFamily, updateFamilyError, updateFamilySuccess } from "../slices/family-slice";
import { showSnackbar } from "../slices/ui-slice";

export const familyListenerMiddleware = createListenerMiddleware();

familyListenerMiddleware.startListening({
  actionCreator: addFamily,
  effect: async (action, listenerApi) => {
    let res;
    if (action?.payload)
      res = await saveFamilyAPI(action.payload);

    listenerApi.cancelActiveListeners();
    if (res?.status === 201) {
      listenerApi.dispatch(addFamilySuccess(res?.data));
      listenerApi.dispatch(showSnackbar({
        message: "Family created",
        severity: "success"
      }));
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
      listenerApi.dispatch(updateFamilySuccess(res?.data));
      listenerApi.dispatch(showSnackbar({
        message: "Family name updated",
        severity: "success"
      }));
    } else {
      listenerApi.dispatch(updateFamilyError(res?.data.error));
      listenerApi.dispatch(showSnackbar({
        message: "An error occured while updating family name",
        severity: "error"
      }));
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
      listenerApi.dispatch(removeFamilySuccess(action.payload));
      listenerApi.dispatch(showSnackbar({
        message: "Family and associated logs removed",
        severity: "success"
      }));
    } else {
      listenerApi.dispatch(removeFamilyError(res?.data.error));
      listenerApi.dispatch(showSnackbar({
        message: "An error occured while removing family",
        severity: "error"
      }));
    }
  },
});

