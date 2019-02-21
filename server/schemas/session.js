const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");
import player from "./player";

// GraphQL schema
export default SessionType = new GraphQLObjectType({
  name: "Session",
  fields: () => ({
    users: { type: [player] },
    index: { type: GraphQLInt },
    uid: { type: GraphQLString }
  })
});