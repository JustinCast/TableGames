// firestore instance
import db from "../config/config";
import { cpuPlayer } from "./memory";

// Fill list logit game
export function fillList(size) {
  let array = [];

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      array.push({
        img: "",
        x: i,
        y: j,
        token: false,
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
export function checkSelection(stateGameId) {
  return new Promise(r => {
    db.collection("stateGame")
      .doc(stateGameId)
      .get()
      .then(data => {
        if (!data.firstCheck) {
          db.collection("stateGame")
            .doc(stateGameId)
            .update({ firstCheck: true });
          r(false);
        } else {
          db.collection("stateGame")
            .doc(stateGameId)
            .update({ firstCheck: false });
          r(true);
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

function changeActualUser(stateGameId, user, gameName) {
  return new Promise(resolve => {
    resolve(
      db
        .collection("stateGame")
        .doc(stateGameId)
        .update({
          actualPlayer: user
        })
        .then(game => {
          // aqui se llama el jugador automático para cada juego
          if (gameName === "Memory") 
            cpuPlayer(stateGameId, game);
          else {
            // llamar a damas
          }
        })
    );
  });
}

export function addScore(stateGameId, actualPlayer) {
  db.collection("stateGame")
    .doc(stateGameId)
    .get()
    .then(state => {
      if (state)
        db.collection("session")
          .where("stateGameId", "==", stateGameId)
          .get()
          .then(session => {
            if (session.users[0].uid === actualPlayer) {
              state.scores.p1Score++;
              session.users[1] === null
                ? changeActualUser(stateGameId, null, session.game)
                : changeActualUser(
                    stateGameId,
                    session.users[1].uid,
                    session.game
                  );
            } else {
              state.scores.p2Score++;
              changeActualUser(stateGameId, session.users[0].uid, session.game);
            }
            // resetear el primer click
            // TODO: es posible que esto deba hacerse desde cada lógica de juego
            resetFirstCheck(stateGameId); // suscribirse a la promise, si es necesario
          });
    });
}

function resetFirstCheck(stateGameId) {
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
    resolve(
      db
        .collection("stateGame")
        .doc(stateGameId)
        .update({
          game: game
        })
    )
  );
}

export function identifyGameWhenClick(stateGameId) {
  return new Promise(resolve =>
    resolve(
      db
        .collection("session")
        .where("stateGameId", "==", stateGameId)
        .get()
        .then(session => {
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

// función de probabilidad
export function getProbability(difficulty) {
  switch (difficulty) {
    case 1:
      getAssertion(0.25);
      break;
    case 2:
      getAssertion(0.6);
      break;
    case 3:
      getAssertion(0.85);
      break;
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
