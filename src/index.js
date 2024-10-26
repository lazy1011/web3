import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";
import { Theme } from "./Utils/Theme";
import { Web3AuthProvider } from "./contexts/SocialLoginContext.tsx";

import "@biconomy/web3-auth/dist/src/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Web3AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Web3AuthProvider>
  </React.StrictMode>
);
