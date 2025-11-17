import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { UiSnackbar } from "./components/ui/snackbar.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <UiSnackbar />
      </PersistGate>
    </Provider>
  </StrictMode>
);
