const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require("graphql");
import {PlayerType, PlayerInputType} from "./player";

// GraphQL schema
const SessionType = new GraphQLObjectType({
  name: "SessionType",
  fields: () => ({
    //users: { type: new GraphQLList(PlayerType) },
    index: { type: GraphQLInt },
    uid: { type: GraphQLString }
  })
});

module.exports = SessionType;
