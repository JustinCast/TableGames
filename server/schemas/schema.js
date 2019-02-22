import { GraphQLSchema, GraphQLObjectType } from "graphql";

import { RootQuery, mutation } from "./session";

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      ...RootQuery
    })
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
      ...mutation
    })
  })
});
