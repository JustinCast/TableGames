'use strict'
import { SubscriptionServer } from 'subscriptions-transport-ws';
//import { Server } from 'http';
const cors = require('cors')
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
const express = require("express");
const expressGraphQL = require("express-graphql");
// import GraphHTTP from 'express-graphql';
import 'dotenv/config';
const port = 4000;



import Schema from "./schemas/schema";

const app = express();
app.use(cors());
//const server = Server(app);
// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

// Bind it to port and start listening
// websocketServer.listen(WS_PORT, () => console.log(
//   `Websocket Server is now running on http://localhost:${WS_PORT}`
// ));


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
  server: websocketServer,
  path: '/root',
}, );


app.listen(port, () => {
  console.log(`Running server on ${port}`);
});
