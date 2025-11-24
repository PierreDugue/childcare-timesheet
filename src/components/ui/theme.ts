import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    height: "1rem",
                    color: "#8d0606ff"
                },
            },
        },
    },
});