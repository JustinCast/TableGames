// import GraphQL object types
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} from "graphql";

// firestore instance
import db from "./config/config";
// import schemas
import Session from "./schemas/session";
import Player from "./schemas/player";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    sessions: {
      type: GraphQLList(Session),
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
      type: Session,
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
      type: GraphQLList(Player),
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
      type: Player,
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
      type: session,
      args: {
        users: { type: GraphQLList },
        index: { type: new GraphQLNonNull(GraphQLInt) },
        uid: { type: new GraphQLNonNull(GraphQLString) }
      },
      /**
       * TODO: implementar
       * @param {*} parentValue
       * @param {*} args
       */
      resolve(parentValue, args) {}
    }
  }
});

// exporting RootQuery and mutations
