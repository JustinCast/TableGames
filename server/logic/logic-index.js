// firestore instance
import db from "../config/config";

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



export function checkSelection(stateGameId){
  return new Promise(r => {
    db.collection("stateGame").doc(stateGameId)
    .get().then((data) => {
      if (!data.firstCheck) {
        db.collection("stateGame").doc(stateGameId).update({firstCheck: true})
        r(false)
      } else {
        db.collection("stateGame").doc(stateGameId).update({firstCheck: false})
        r(true)
      }
    })
  }) 
  
}

export function checkActualPlayer(stateGameId, playerId){
  return new Promise( resolve => {
    db.collection("stateGame").doc(stateGameId)
    .where("actualPlayer", "==", playerId)
    .get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
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

export function changeActualUser(stateGameId, userToken) {
  return new Promise(resolve => {
    resolve(
      db
        .collection("stateGame")
        .doc(stateGameId)
        .update({
          actualPlayer: userToken
        })
    );
  });
}
