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
import db from "../config/config";
// import schemas
import { SessionType, SessionInputType } from "./session";
import { PlayerType, PlayerInputType } from "./player";

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
              console.log(element.data());
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
      type: new GraphQLList(PlayerType),
      resolve() {
        return db
          .collection("player")
          .get()
          .then(elements => {
            return elements.docs.map(doc => doc.data());
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

// TODO: DEFINE THE PLAYER INPUT MODEL
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    saveSession: {
      type: SessionType,
      args: {
        input: {
          type: new GraphQLNonNull(SessionInputType)
        }
      },
      resolve: async (_, input) => {
        return db.collection("session").set(input);
      }
    },
    savePlayer: {
      type: PlayerType,
      args: {
        input: {
          type: new GraphQLNonNull(PlayerInputType)
        }
      },
      resolve: async (_, data) => {
        console.log(data.input.uid);
        var docRef = db.collection("player").doc(data.input.uid);

        if (!db.collection("player").where("uid", "==", data.input.uid)){
          docRef.set({
            name: data.input.name,
            email: data.input.email,
            wonGames: data.input.wonGames,
            lostGames: data.input.lostGames,
            tiedGames: data.input.tiedGames,
            uid: data.input.uid
          });
          return data.input;
        }
        return null;
      }
    }
  }
});

// exporting RootQuery and mutations
export { RootQuery, mutation };
