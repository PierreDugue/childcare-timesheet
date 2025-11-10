import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authAPI } from "../apis/user-api";
import { fetchFamilies } from "../slices/familySlice";
import { auth, authSuccess } from "../slices/userSlice";

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
    actionCreator: auth,
    effect: async (action, listenerApi) => {
        let res;
        if (action?.payload)
            res = await authAPI(action.payload);

        console.log('Logged in', res?.data)
        listenerApi.cancelActiveListeners();
        if (res?.status === 200) {
            listenerApi.dispatch(authSuccess(res?.data.access));
            listenerApi.dispatch(fetchFamilies())
        }
    },
});
