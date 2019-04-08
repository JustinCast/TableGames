// firestore instance
import db from "../config/config";
import { cpuPlayer } from "./memory";
import { square_black, machineLogicChecker } from "./checkers";
// Fill list logit game
export function fillList(size) {
  let array = [];

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      array.push({
        img: "",
        x: i,
        y: j,
        owner: false,
        img2: ""
      });
    }
  }
  return array;
}

// Check if element is checker and owner checker
export function isCheckerPlayer(stateGameId, playerId, checker) {
  return new Promise(r => {
    db.collection("session")
      .where("stateGameId", "==", stateGameId)
      .get()
      .then(data => {
        if (data.users[0].uid === playerId) {
          // Player one
          if (checker.owner === false) {
            // Checker owner is player one
            r(true);
          } else {
            r(false);
          }
        } else {
          // Player two
          if (checker.owner === true) {
            // Checker owner is player two
            r(true);
          } else {
            r(false);
          }
        }
      });
  });
}

// Check if is the first or the second selection
export function checkSelection(stateGameId, obj) {
  return new Promise(r => {
    db.collection("stateGame")
      .doc(stateGameId)
      .get()
      .then(querySnapshot => {
        let data = querySnapshot.data();
        if (obj.owner === false) {
          db.collection("stateGame")
            .doc(stateGameId)
            .update({ firstCheck: obj });   
          r(false)
        } else if(obj.owner === true){
          db.collection("stateGame")
            .doc(stateGameId)
            .update({ firstCheck: obj });
          r(false)
        }else if(obj.img === square_black){
          if(data.firstCheck !== null) r(true)
          else r(false)
        }else{
          r(false);
        }
        
      });
  });
}

// some firebase funcs
export function saveStateGame(game, token) {
  if (token === undefined)
    // Start default state game
    return new Promise(resolve =>
      resolve(
        db
          .collection("stateGame")
          .add(game)
          .then(function(docRef) {
            return docRef.id;
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          })
      )
    );
  // Update state game
  else
    return new Promise(resolve =>
      resolve(
        db
          .collection("stateGame")
          .doc(token)
          .set(game)
          .then(function(docRef) {
            return docRef.id;
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          })
      )
    );
}

export function saveMemoryInitialGameState(gameData, token) {
  if (!token)
    return new Promise(resolve =>
      resolve(
        db
          .collection("stateGame")
          .add(gameData)
          .then(docRef => {
            return docRef.id;
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          })
      )
    );
  else
    return new Promise(resolve =>
      resolve(
        db
          .collection("stateGame")
          .doc(token)
          .set(game)
          .then(docRef => {
            return docRef.id;
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          })
      )
    );
}

export function changeActualUser(stateGameId, user, gameName) {
  return new Promise(resolve => {
    console.log(user);
    resolve(
      db
        .collection("stateGame")
        .doc(stateGameId)
        .update({
          actualPlayer: user
        })
        .then(() => {
          db.collection("stateGame")
            .doc(stateGameId)
            .get()
            .then(data => {
              // aqui se llama el jugador automático para cada juego
              let state = data.data();
              if (gameName === "Memory" && user === null)
                cpuPlayer(stateGameId, state);
              else if(gameName === "Damas" && user === null){
                machineLogicChecker(stateGameId);
              }
            });
        })
    );
  });
}
export function getChecker(stateGameId) {
  return new Promise(r => {
    db.collection("stateGame")
      .doc(stateGameId)
      .get()
      .then(checker => {
        r(checker.data().firstCheck);
      });
  });
}
export function addScore(stateGameId, actualPlayer) {
  db.collection("stateGame")
    .doc(stateGameId)
    .get()
    .then(data => {
      if (data) {
        let state = data.data();
        getNextUserInfo(stateGameId, actualPlayer).then(data => {
          if (data.number === "one") {
            state.scores.p1Score++;
            saveNewScoreInDB(stateGameId, state.scores);
          }
          else{
            state.scores.p2Score++;
            saveNewScoreInDB(stateGameId, state.scores);
          }
          resetFirstCheck(stateGameId).then(() => {
            changeActualUser(stateGameId, data.player, data.gameName);
          });
        });
      }
    })
    .catch(err => console.log(err));
}
function saveNewScoreInDB(stateGameId, scores) {
  return new Promise(resolve =>
    db
      .collection("stateGame")
      .doc(stateGameId)
      .update({
        scores: scores
      })
  );
}
export function getNextUserInfo(stateGameId, actualPlayer) {
  return new Promise(resolve => {
    db.collection("session")
      .where("stateGameId", "==", stateGameId)
      .get()
      .then(querySnapshot => {
        let session = querySnapshot.docs[0].data();
        if (session.users[0].uid === actualPlayer)
          session.users[1] === null
            ? resolve({ player: null, number: "one", gameName: session.game })
            : resolve({
                player: session.users[1].uid,
                number: "one",
                gameName: session.name
              });
        else
          resolve({
            player: session.users[0].uid,
            number: "two",
            gameName: session.name
          });
      });
  });
}

export function resetFirstCheck(stateGameId) {
  return new Promise(resolve => {
    resolve(
      db
        .collection("stateGame")
        .doc(stateGameId)
        .update({
          firstCheck: null
        })
    );
  });
}

export function updateGame(stateGameId, game) {
  return new Promise(resolve =>
    db
      .collection("stateGame")
      .doc(stateGameId)
      .update({
        game: game
      })
      .then(updatedMtx => {
        resolve(updatedMtx);
      })
  );
}

export function identifyGameWhenClick(stateGameId) {
  return new Promise(resolve =>
    
    resolve(
      db
        .collection("session")
        .where("stateGameId", "==", stateGameId)
        .get()
        .then(querySnapshot => {
          let session = querySnapshot.docs[0].data();
          if (session)
            switch (session.game) {
              case "Damas":
                return true;
              case "Memory":
                return false;
              default:
                break;
            }
        })
    )
  );
}

export function getDifficulty(stateGameId) {
  return new Promise(r => {
    db.collection("session")
      .where("stateGameId", "==", stateGameId)
      .get()
      .then(session => {
        r(session.docs[0].data().difficulty);
      });
  });
}

// función de probabilidad
export function getProbability(difficulty) {
  switch (difficulty) {
    case 1:
      return getAssertion(0.25);
    case 2:
      return getAssertion(0.6);
    case 3:
      return getAssertion(0.85);
    default:
      break;
  }
}

function getAssertion(prob) {
  let weights = [1 - prob, prob];
  let num = Math.random(),
    s = 0,
    lastIndex = weights.length - 1;

  for (var i = 0; i < lastIndex; ++i) {
    s += weights[i];
    if (num < s) return false;
  }
  return true;
}
