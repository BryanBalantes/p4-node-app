import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContextProvider.jsx";
import DataContextProvider from "./contexts/DataContextProvider.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <DataContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
