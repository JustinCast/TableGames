import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLNonNull
} from "graphql";

const PlayerType = new GraphQLObjectType({
  name: "PlayerType",
  description: "TableGames Player type definition",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    wonGames: { type: GraphQLInt },
    lostGames: { type: GraphQLInt },
    tiedGames: { type: GraphQLInt },
    uid: { type: GraphQLString }
  })
});

const PlayerInputType = new GraphQLInputObjectType({
  name: "PlayerInputType",
  description: "Player type input definition",
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    wonGames: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    lostGames: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    tiedGames: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    uid: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

export {
  PlayerType,
  PlayerInputType
}
