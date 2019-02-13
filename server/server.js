const express = require("express");
const expressGraphQL = require("express-graphql");
const port = process.env.port || 3000;
// TODO: importar aqui el o los schemas

const app = express();

app.use(
  "/root",
  expressGraphQL({
    schema: "", // TODO: importar el schema
    graphiql: true
  })
);

app.listen(port, () => {
  console.log(`Running server on ${port}`);
});
