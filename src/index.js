import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
//import { ws_uri } from "./environments/env";

import ApolloClient, {} from "apollo-client";
import { ApolloLink } from 'apollo-boost'
import { InMemoryCache } from "apollo-cache-inmemory";
//import { SubscriptionClient } from "subscriptions-transport-ws";
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from "react-apollo";

import { 
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
 import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
 import { typeDefs } from './models/schema';
 import { onError } from 'apollo-link-error'


const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });


const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

// Create WebSocket client
// const WSClient = new SubscriptionClient(ws_uri, {
//   reconnect: true,
//   connectionParams: {
//     // Connection parameters to pass some validations
//     // on server side during first handshake
//   }
// });

export const GraphQLClient = new ApolloClient({
  link: ApolloLink.from([errorLink, new HttpLink({ uri: 'http://localhost:4000/root' })]),
  cache: new InMemoryCache(),
  networkInterface: mockNetworkInterface,
});


//GraphQLClient.query({ query: gql`{ players { name } }` }).then(console.log);
ReactDOM.render(
  <ApolloProvider client={GraphQLClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
serviceWorker.register();
