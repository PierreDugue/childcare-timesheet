
import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface SnackbarState {
    open: boolean;
    message: string;
    severity?: "success" | "error" | "info" | "warning";
}

const initialState: SnackbarState = {
    open: false,
    message: "",
    severity: "info",
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        showSnackbar: (
            state,
            action: PayloadAction<{ message: string; severity?: SnackbarState["severity"] }>
        ) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity || "info";
        },
        hideSnackbar: (state) => {
            state.open = false;
        },
    },
});

export const { showSnackbar, hideSnackbar } = uiSlice.actions;
export default uiSlice.reducer;
