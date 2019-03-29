import { GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from "graphql";

const ClickObjectType = new GraphQLObjectType({
  name: "ClickObjectType",
  fields: () => ({
    stateGameId: { type: GraphQLString },
    player: { type: GraphQLString }, // es el identificador del jugador
    object: { type: Object }
  })
});

const ClickObjectInputType = new GraphQLInputObjectType({
  name: "ClickObjectInputType",
  fields: () => ({
    stateGameId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    player: {
      type: new GraphQLNonNull(GraphQLString)
    },
    object: {
      type: new GraphQLNonNull(Object)
    }
  })
});

export { ClickObjectType, ClickObjectInputType };