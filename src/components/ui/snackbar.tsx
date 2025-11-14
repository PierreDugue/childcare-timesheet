import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../../slices/ui-slice";
import type { RootState } from "../../app/store";

export function UiSnackbar() {
    const dispatch = useDispatch();
    const { open, message, severity } = useSelector((state: RootState) => state.ui);

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => dispatch(hideSnackbar())}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert severity={severity} onClose={() => dispatch(hideSnackbar())}>
                {message}
            </Alert>
        </Snackbar>
    );
}
