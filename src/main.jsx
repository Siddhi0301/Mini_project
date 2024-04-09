import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./services/store";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
  domain="dev-kw8ijqw5rmvrptuj.us.auth0.com"
  clientId="2KXZSrV3ZqauqpdJk7OxRm9T5qhPr5NF"
  authorizationParams={{
    redirect_uri: window.location.origin}}>
      <Provider store={store}>
      <App />
    </Provider>

 
</Auth0Provider>
    
);

  