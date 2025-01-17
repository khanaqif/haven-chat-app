import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner"; // Ensure Toaster is imported from sonner

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster closeButton />
  </StrictMode>
);
