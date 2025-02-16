import React from "react";
import ReactDOM from "react-dom/client";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
/* import { SocketProvider } from "./context/SocketContext.jsx"; */
import { SocketProvider } from "./context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  /*  <StrictMode> */

  <SocketProvider>
    <App />
    <Toaster closeButton />
  </SocketProvider>
  /* </StrictMode> */
);
