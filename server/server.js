'use strict'
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { Server } from 'http';
import { execute, subscribe } from 'graphql';
const express = require("express");
const expressGraphQL = require("express-graphql");
import GraphHTTP from 'express-graphql';
import 'dotenv/config';
const port = process.env.port || 3000;



import Schema from "./query-mutations";

const app = express();
const server = Server(app);

/** 
 * Http graphql definition
 * **/
app.use(
  "/root",
  expressGraphQL({
    schema: Schema,
    graphiql: true
  })
);

/** GraphQL Websocket definition **/
SubscriptionServer.create({
  Schema,
  execute,
  subscribe,
}, {
  server: server,
  path: '/root',
}, );


app.listen(port, () => {
  console.log(`Running server on ${port}`);
});
