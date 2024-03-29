/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LinearProgress />}>
        <App />
      </Suspense>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);
