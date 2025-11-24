import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from '@mui/material';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./app/App.tsx";
import { persistor, store } from "./app/store.ts";
import { UiSnackbar } from "./components/ui/snackbar.tsx";
import { theme } from "./components/ui/theme.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
        <UiSnackbar />
      </PersistGate>
    </Provider>
  </StrictMode>
);
