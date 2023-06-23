import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SnacksContextProvider from "./contexts/SnacksContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SnacksContextProvider>
    <App />
  </SnacksContextProvider>
);
