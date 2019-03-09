import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { ws_uri, http_uri } from "./environments/env";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { ApolloProvider } from "react-apollo";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

//export default (client = new ApolloClient(http_uri));

// Create WebSocket client
const WSClient = new SubscriptionClient(ws_uri, {
  reconnect: true,
  connectionParams: {
    // Connection parameters to pass some validations
    // on server side during first handshake
  }
});

const GraphQLClient = new ApolloClient({
  link: WSClient,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={GraphQLClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);