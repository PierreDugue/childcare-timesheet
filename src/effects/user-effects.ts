import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authAPI, createUserAPI } from "../apis/user-api";
import { fetchFamilies } from "../slices/family-slice";
import { showSnackbar } from "../slices/ui-slice";
import {
  auth,
  authError,
  authSuccess,
  createUser,
  createUserError,
  createUserSuccess,
} from "../slices/user-slice";
import { navigateTo } from "../utils/navigate";

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  actionCreator: auth,
  effect: async (action, listenerApi) => {
    let res;
    try {
      if (action?.payload) res = await authAPI(action.payload);
      listenerApi.cancelActiveListeners();
      if (res?.status === 200) {
        listenerApi.dispatch(authSuccess(res?.data.access));
        listenerApi.dispatch(fetchFamilies());
      } else {
        listenerApi.dispatch(authError(res?.data.error));
      }
    } catch (err) {
      listenerApi.dispatch(authError("Authentication error"));
      listenerApi.dispatch(
        showSnackbar({
          message:
            "Authentication error. Please, check your username and password",
          severity: "error",
        })
      );
    }
  },
});

authListenerMiddleware.startListening({
  actionCreator: createUser,
  effect: async (action, listenerApi) => {
    let res;
    try {
      if (action?.payload) res = await createUserAPI(action.payload);
      listenerApi.cancelActiveListeners();
      if (res?.status === 201) {
        navigateTo("/");
        listenerApi.dispatch(
          showSnackbar({
            message: "Account created",
            severity: "success",
          })
        );
        listenerApi.dispatch(createUserSuccess());
      } else {
        listenerApi.dispatch(createUserError());
      }
    } catch (err: any) {
      listenerApi.dispatch(
        showSnackbar({
          message: "An error occured while creating an account",
          severity: "error",
        })
      );
      listenerApi.dispatch(createUserError());
    }
  },
});
