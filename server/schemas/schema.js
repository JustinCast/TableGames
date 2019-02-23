import { GraphQLSchema } from "graphql";

import { RootQuery, mutation } from "./query-mutations";

export default new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
});
