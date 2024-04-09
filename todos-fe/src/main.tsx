import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-l1hhkali.us.auth0.com"
      clientId="qsU4oTBBIOWmJ15521Zx7xu5aIoWKxn1"
      useRefreshTokens={true}
      cacheLocation="localstorage"
      authorizationParams={{
        redirectUri: window.location.origin,
        scope: "openid profile email",
        audience: "todolist api",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
