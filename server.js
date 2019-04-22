'use strict'
const Server = require('http');
const express = require("express");
const expressGraphQL = require("express-graphql");
const path = require('path');
import 'dotenv/config';
const cors = require('cors')
const port = process.env.port || 5000;

import Schema from "./server/schemas/schema";

const app = express();
//const server = Server(app);

app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './build')));

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});



app.listen(port, () => {
  console.log(`Running server on ${port}`);
});
