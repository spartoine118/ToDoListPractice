import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import AppRoutes from "./app-routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
