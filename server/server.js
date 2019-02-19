'use strict'
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
const express = require("express");
const expressGraphQL = require("express-graphql");
import 'dotenv/config';
const port = process.env.port || 3000;
// TODO: importar aqui el o los schemas
import { Session } from "./models/session";

const app = express();

/** 
 * Http graphql definition
 * **/
// app.use(
//   "/api/ql",
//   expressGraphQL({
//     schema: session, // TODO: importar el schema
//     graphiql: true
//   })
// );

/** GraphQL Websocket definition **/
SubscriptionServer.create({
  //schema,
  execute,
  subscribe,
}, {
  //server: server,
  path: '/api/ws',
}, );


app.listen(port, () => {
  console.log(`Running server on ${port}`);
});
