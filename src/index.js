import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import SnacksContextProvider from "./contexts/SnacksContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnacksContextProvider>
        <App />
      </SnacksContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
