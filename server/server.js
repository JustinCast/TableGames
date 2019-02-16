import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
const express = require("express");
const expressGraphQL = require("express-graphql");
const port = process.env.port || 3000;
// TODO: importar aqui el o los schemas

const app = express();

app.use(
  "/api/ql",
  expressGraphQL({
    schema: "", // TODO: importar el schema
    graphiql: true
  })
);

/** GraphQL Websocket definition **/
SubscriptionServer.create({
  schema,
  execute,
  subscribe,
}, {
  server: server,
  path: '/api/ws',
}, );

app.listen(port, () => {
  console.log(`Running server on ${port}`);
});
