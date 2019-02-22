const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require("graphql");
import Player from "./player";

// GraphQL schema
const SessionType = new GraphQLObjectType({
  name: "SessionType",
  fields: () => ({
    users: { type: new GraphQLList(Player) },
    index: { type: GraphQLInt },
    uid: { type: GraphQLString }
  })
});

module.exports = SessionType;
