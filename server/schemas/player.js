import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

export default PlayerType = new GraphQLObjectType({
  name: "Player",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    wonGames: { type: GraphQLInt },
    lostGames: { type: GraphQLInt },
    tiedGames: { type: GraphQLInt },
    uid: { type: GraphQLString }
  })
});