// firestore instance
import db from "../config/config";

export function fillList(size) {
  let array = [];
  
  for (let i = 0; i < size; i++){
    for (let j = 0; j < size; j++) {
      array.push({
        img: '',
        x: i,
        y: j,
        token: false,
        img2: ''
      })
    }
  }
  return array;
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