const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLBoolean
} = require("graphql");
import { PlayerType, PlayerInputType } from "./player";

// GraphQL schema
const SessionType = new GraphQLObjectType({
  name: "SessionType",
  fields: () => ({
    users: { type: new GraphQLList(PlayerType) },
    index: { type: GraphQLInt },
    sid: { type: GraphQLString },
    game: { type: GraphQLString },
    difficulty: { type: GraphQLInt },
    isMachine: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    gameSize: { type: GraphQLInt }
  })
});

const SessionInputType = new GraphQLInputObjectType({
  name: "SessionInputType",
  description: "SessionInputType model",
  fields: () => ({
    users: {
      type: new GraphQLNonNull(new GraphQLList(PlayerInputType))
    },
    index: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    uid: {
      type: new GraphQLNonNull(GraphQLString)
    },
    game: {
      type: new GraphQLNonNull(GraphQLString)
    },
    difficulty: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    isMachine: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    gameSize: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
});

export { SessionType, SessionInputType };
