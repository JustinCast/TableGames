import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
//import { ws_uri } from "./environments/env";

import ApolloClient, {} from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
//import { SubscriptionClient } from "subscriptions-transport-ws";
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from "react-apollo";
import gql from 'graphql-tag';

// Create WebSocket client
// const WSClient = new SubscriptionClient(ws_uri, {
//   reconnect: true,
//   connectionParams: {
//     // Connection parameters to pass some validations
//     // on server side during first handshake
//   }
// });

export const GraphQLClient = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/root' }),
  cache: new InMemoryCache()
});


//GraphQLClient.query({ query: gql`{ players { name } }` }).then(console.log);
ReactDOM.render(
  <ApolloProvider client={GraphQLClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
serviceWorker.register();
