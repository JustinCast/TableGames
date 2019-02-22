const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
import { PlayerType, PlayerInputType } from "./player";

// GraphQL schema
const SessionType = new GraphQLObjectType({
  name: "SessionType",
  fields: () => ({
    users: { type: new GraphQLList(PlayerType) },
    index: { type: GraphQLInt },
    uid: { type: GraphQLString }
  })
});

const SessionInputType = new GraphQLObjectType({
  name: "SessionInputType",
  description: "SessionInputType model",
  fields: () => ({
    users: {
      type: new GraphQLNonNull(new GraphQLList(PlayerType))
    },
    index: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    uid: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

export { SessionType, SessionInputType };
