// import GraphQL object types
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLSchema
} from "graphql";

import { fillDefaultCheck } from '../logic/checkers';
import { saveStateGame } from '../logic/logic-index';
// firestore instance
import db from "../config/config";
// import schemas
import { SessionType, SessionInputType } from "./session";
import { PlayerType, PlayerInputType } from "./player";

// import memory fill

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    sessions: {
      type: new GraphQLList(SessionType),
      resolve() {
        return db
        .collection("session")
        .get()
        .then(elements => {
          return elements.docs.map(doc => doc.data());
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
      resolve: async (_, data) => {
        //db.collection("session").add(data.input);
        let token;
      
        if(data.input.game === "Damas"){ // If game is chekers
          token = saveStateGame(fillDefaultCheck(data.input.gameSize),undefined); 
        }else if(data.input.game === "Memory")
        return token
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
        var docRef = db.collection("player").doc(data.input.email);
        
        db.collection("player").doc(data.input.email)
        .get().then(docSnapshot => {
          if (!docSnapshot.exists) {
            docRef.set({
              name: data.input.name,
              email: data.input.email,
              wonGames: data.input.wonGames,
              lostGames: data.input.lostGames,
              tiedGames: data.input.tiedGames,
              uid: data.input.uid
            });
          }
        });
        return db
        .collection("player")
        .doc(data.input.email)
        .get()
        .then(docs => {
          return docs.data();
        });
      }
    }
  }
});

// exporting RootQuery and mutations
export { RootQuery, mutation };
