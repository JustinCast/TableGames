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


export function saveStateGame(game,token){
  if(token === undefined){ // Start default state game
    db.collection("stateGame").add(game)
    .then(function(docRef) {
      return docRef.id;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }else{ // Update state game
    db.collection("stateGame").doc(token).set(game)
    .then(function(docRef) {
      return docRef.id;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
  
}