// import GraphQL object types
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
  
} from "graphql";

import { fillDefaultCheck,isCheckerPlayer,isMovementValid,game } from "../logic/checkers";
import {
  saveMemoryInitialGameState,
  saveStateGame,
  identifyGameWhenClick,
  checkSelection,
  getChecker
} from "../logic/logic-index";
// firestore instance
import db from "../config/config";
// import schemas
import { SessionType, SessionInputType } from "./session";
import { PlayerType, PlayerInputType } from "./player";

// import memory fill
import { memoryInit, playMemory } from "../logic/memory";
import { ClickObjectType, ClickObjectInputType } from "./click-object";
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
        return new Promise(resolve => {
          const sessionRef = db.collection("session").where("stateGameId","==",data.input.stateGameId);
          sessionRef.get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              sessionRef.update(data.input);
            } else {
              if (data.input.game === "Damas") {
                // If game is chekers
                let game = fillDefaultCheck(data.input.gameSize);
                game["actualPlayer"] = data.input.users[0].uid;
                saveStateGame(game, undefined).then(ref => {
                  data.input["stateGameId"] = ref;
                  db.collection("session").add(data.input);
                  resolve(data.input);
                });
              } else {
                memoryInit(data.input.gameSize).then(gameData => {
                  gameData["actualPlayer"] = data.input.users[0].uid;
                  saveMemoryInitialGameState(gameData, undefined).then(ref => {
                    data.input["stateGameId"] = ref;
                    db.collection("session").add(data.input);
                    console.log(data.input);
                    resolve(data.input);
                  });
                });
              }
            }
          });


        });
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

        db.collection("player")
          .doc(data.input.email)
          .get()
          .then(docSnapshot => {
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
    },
    click: {
      type: ClickObjectType,
      args: {
        input: {
          type: new GraphQLNonNull(ClickObjectInputType)
        }
      },
      resolve: async (_, data) => {
        identifyGameWhenClick(data.input.stateGameId)
        .then(result => {
          if(!result)
            playMemory(
              data.input.stateGameId,
              data.input.player,
              data.input.object
            );
          else {
            if(isCheckerPlayer(data.input.stateGameId,data.input.player,data.input.object)){ // Corresponds to the current player ?
              if(checkSelection(data.input.stateGameId,data.input.object)){ // Is the second click ?
                if(isMovementValid( // Is a valid movement ?
                  getChecker(data.input.stateGameId),
                  data.input.object, 
                  data.input.stateGameId,
                  data.input.player)){
                    saveStateGame(game,data.input.stateGameId);
                    return data.input.stateGameId;
                  }else return null
              }
            }
          }
        })
        
      }
    }
  }
});


// exporting RootQuery and mutations
export { RootQuery, mutation };
