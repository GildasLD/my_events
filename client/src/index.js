import "./index.css";
import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals.js";

const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
reportWebVitals(console.warn);
