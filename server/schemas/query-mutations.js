// import GraphQL object types
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from "graphql";

import {
  fillDefaultCheck,
  isCheckerPlayer,
  isMovementValid,
  game
} from "../logic/checkers";
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
          if (
            (data.input.users.length === 2) &&
            (data.input.users[1] !== null)
          ) {
            const sessionRef = db
              .collection("session")
              .where("stateGameId", "==", data.input.stateGameId);
            sessionRef.get().then(docSnapshot => {
              if (
                docSnapshot.docs[0].exists &
                (data.input.users[0].uid !== data.input.users[1].uid)
              ) {
                db.collection("session")
                  .doc(docSnapshot.docs[0].id)
                  .update({
                    difficulty: data.input.difficulty,
                    game: data.input.game,
                    gameSize: data.input.gameSize,
                    isMachine: data.input.isMachine,
                    name: data.input.name,
                    sid: data.input.sid,
                    stateGameId: data.input.stateGameId,
                    users: data.input.users
                  })
                  .then(() => {
                    resolve(data.input);
                  });
              }
            });
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
                  resolve(data.input);
                });
              });
            }
          }
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
        identifyGameWhenClick(data.input.stateGameId).then(result => {
          if (!result)
            playMemory(data.input.stateGameId, JSON.parse(data.input.object));
          else {
            isCheckerPlayer(
              data.input.stateGameId,
              data.input.player,
              JSON.parse(data.input.object)
            ).then(res => {
              if (res.val) {
                checkSelection(
                  data.input.stateGameId,
                  JSON.parse(data.input.object),
                  res.data
                ).then(res2 => {
                  // Corresponds to the current player ?
                  if (res2) {
                    getChecker(data.input.stateGameId).then(checker => {
                      if (
                        isMovementValid(
                          // Is a valid movement ?
                          checker,
                          JSON.parse(data.input.object),
                          data.input.stateGameId,
                          data.input.player
                        )
                      ) {
                        //saveStateGame(game,data.input.stateGameId);
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
  }
});

// exporting RootQuery and mutations
export { RootQuery, mutation };
