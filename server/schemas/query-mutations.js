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
// firestore instance
import db from "../config/config";
// import schemas
import { SessionType, SessionInputType } from "./session";
import { PlayerType, PlayerInputType } from "./player";

// import memory fill
import { memoryInit } from "../logic/memory";
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
      
        if(data.input.game === "Damas"){ // If game is chekers
          saveStateGame(fillDefaultCheck(data.input.gameSize),undefined)
          .then(ref => {
              db.collection("session").add(data.input);
          }); 
        } 
        else {
          memoryInit(data.input.gameSize)
            .then(gameData => {
              saveMemoryInitialGameState(gameData, undefined)
              .then(ref => {
                data.input["stateGameId"] = ref;
                db.collection("session").add(data.input);
              }
            );
          });
        }
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


// some firebase funcs
function saveStateGame(game,token){
  if(token === undefined) // Start default state game
    return new Promise(resolve => resolve(
      db.collection("stateGame").add(game)
      .then(function(docRef) {
        return docRef.id;
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      })
    ));

  else // Update state game
    return new Promise(resolve => resolve(
      db.collection("stateGame").doc(token).set(game)
      .then(function(docRef) {
        return docRef.id;
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      })
    ));
  
}

async function saveMemoryInitialGameState(gameData, token) {
  if(!token)
    return new Promise(resolve => resolve(
      db.collection("stateGame")
      .add(gameData)
      .then(docRef => {
        return docRef.id
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      })
    ));
  else
    return new Promise(resolve => resolve(
      db.collection("stateGame")
      .doc(token)
      .set(game)
      .then(docRef => {
        return docRef.id;
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      })
    ));
}