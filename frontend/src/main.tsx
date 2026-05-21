import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ConfirmProvider } from "./hooks/useConfirm";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </HashRouter>
  </StrictMode>
);


