// import GraphQL object types
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLSchema
} from "graphql";

// firestore instance
import db from "./config/config";
// import schemas
import SessionType from "./schemas/session";
import PlayerType from "./schemas/player";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    sessions: {
      type: new GraphQLList(SessionType),
      resolve() {
        return db
          .collection("session")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(element => {
              console.log(element);
            });
          });
      }
    },
    session: {
      type: SessionType,
      args: {
        uid: { type: GraphQLString }
      },
      resolve(_, args) {
        return db
          .collection("session")
          .where("uid", "==", args.uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(element => {
              console.log(element);
            });
          });
      }
    },
    players: {
      type: GraphQLList(PlayerType),
      resolve() {
        return db
          .collection("player")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(element => {
              console.log(element);
            });
          });
      }
    },
    player: {
      type: PlayerType,
      args: {
        uid: { type: GraphQLString }
      },
      resolve(_, args) {
        return db
          .collection("player")
          .where("uid", "==", args.uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(element => {
              console.log(element);
            });
          });
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    saveSession: {
      type: SessionType,
      args: {
        users: {type: PlayerType},
        index: { type: new GraphQLNonNull(GraphQLInt) },
        uid: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, input) => {
        return db.collection("session").set(input);
      }
    },
    savePlayer: {
      type: PlayerType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        wonGames: { type: GraphQLInt },
        lostGames: { type: GraphQLInt },
        uid: { type: GraphQLString }
      },
      resolve: async (_, input) => {
        return db.collection("player").set(input);
      }
    }
  }
});

// exporting RootQuery and mutations
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
});
