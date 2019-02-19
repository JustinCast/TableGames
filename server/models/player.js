import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} from "graphql";

const player = new GraphQLObjectType({
  name: "player",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    wonGames: { type: GraphQLInt },
    lostGames: { type: GraphQLInt },
    tiedGames: { type: GraphQLInt },
    uid: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    players: {
      type: new GraphQLList(player),
      /**
       * TODO: IMPLEMENTAR RESOLVER
       */
      resolve() {}
    },
    player: {
      type: player,
      args: {
        id: { type: GraphQLString }
      },
      /*TODO: implement resolver */
      resolve(parent, args) {}
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPlayer: {
      type: player,
      
    }
  }
});
