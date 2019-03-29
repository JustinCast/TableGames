import {
  fillList
} from './logic-index';
// firestore instance
import db from "../config/config";

// Images
const square_black = "https://firebasestorage.googleapis.com/v0/b/tablegames-4feca.appspot.com/o/black_square.png?alt=media&token=33c73aa8-d651-4b4f-82de-097c01cdaac4";
const square_white = "https://firebasestorage.googleapis.com/v0/b/tablegames-4feca.appspot.com/o/white_square.png?alt=media&token=2439fb8c-86f3-442b-9ddd-5e18580e23d8";
const blue_token = "https://firebasestorage.googleapis.com/v0/b/tablegames-4feca.appspot.com/o/blue_token.png?alt=media&token=8f8e309f-052b-4a87-a18b-637fa884baad";
const red_token = "https://firebasestorage.googleapis.com/v0/b/tablegames-4feca.appspot.com/o/red_token.png?alt=media&token=0e734f98-c4b9-4474-836e-1dc8b9cd9937";
const redCrown_token = "https://firebasestorage.googleapis.com/v0/b/tablegames-4feca.appspot.com/o/redCrown_token.png?alt=media&token=384ac3e1-c149-4a4b-8235-88d196bd8f4d";
const blueCrown_token = "https://firebasestorage.googleapis.com/v0/b/tablegames-4feca.appspot.com/o/blueCrown_token.png?alt=media&token=fa454b24-e8ce-4ef0-ae7c-6a8e689b02b9";

// Method to fill default checker game
export function fillDefaultCheck(size) {
  let checkerGame = fillList(size);
  checkerGame.forEach(element => {
    if (element.x < 3) { // Player 1
      if ((element.x % 2 === 0 & element.y % 2 === 0) | (element.x % 2 !== 0 & element.y % 2 !== 0)) {
        element.img = blue_token;
        element.owner = false; // Is player one
      } else {
        element.owner = null;
        element.img = square_white;
      }
    } else {
      if (element.x > size - 4) {
        if ((element.x % 2 === 0 & element.y % 2 === 0) | (element.x % 2 !== 0 & element.y % 2 !== 0)) {
          element.img = red_token;
          element.owner = true; // Is player two
        } else {
          element.owner = null;
          element.img = square_white;
        }
      } else {
        if ((element.x % 2 === 0 & element.y % 2 === 0) | (element.x % 2 !== 0 & element.y % 2 !== 0)) {
          element.img = square_black;
          element.owner = null; // Is player one
        } else {
          element.owner = null;
          element.img = square_white;
        }
      }
    }
  });
  let game = {
    game: checkerGame,
    scores: {
      p1Score: 0,
      p2Score: 0
    },
    firstCheck: null
  }

  return game;
}

// Check if element is checker and owner checker
export function isCheckerPlayer(stateGameId, playerId, checker) {
  return new Promise(r => {
    db.collection("session").where("stateGameId", "==", stateGameId)
      .get().then((data) => {
        if (data.users[0].uid === playerId) { // Player one
          if (checker.owner === false) { // Checker owner is player one
            r(true);
          } else {
            r(false);
          }
        } else { // Player two
          if (checker.owner === true) { // Checker owner is player two
            r(true);
          } else {
            r(false);
          }
        }
      })
  })
}

export function isMovementValid(checker, nextMovement, stateGameId) {
  return new Promise(r => {
    db.collection("stateGame").doc(stateGameId)
      .get().then((data) => {
        data.game.forEach(element => {
          if(element.x === nextMovement.x & element.y === nextMovement.y){ // Search second movement
            if (checker.owner === false) { // Checker Player One
              if (oneMovementDown(element,checker)) { 
                if(element.owner === null){ 
                  if(convertInCrown(nextMovement,data.game.length)){
                    //TODO: corona azul
                  }
                  //TODO: pintar 
                }else if(element.owner === true & twoMovementDown(element,checker)){
                  //TODO: come
                  /// TODO: pintar
                }
              }
            }else if(checker.owner == true){ // Checker Player two
              if (oneMovementUp(element,checker)) { 
                if(element.owner === null){
                  if(convertInCrown(nextMovement,data.game.length)){
                    //TODO: corona roja
                  }
                  //TODO: pintar 
                }else if(element.owner === false & twoMovementUp(element,checker)){
                  //TODO: come
                  /// TODO: pintar
                }
              }
            }else if(checker.img === redCrown_token || checker.img === blueCrown_token){ // Checker is Crown
              if( oneMovementUp(element, checker) || oneMovementDown(element, checker)){
                if(element.owner === null){ 
                  //TODO: pintar 
                }else if(element.owner === true & (twoMovementDown(element,checker))|| twoMovementUp(element,checker)){
                  //TODO: come
                  /// TODO: pintar
                }
              }
            } 
          }
        })
      })
  })
}

function oneMovementDown(element,checker){
  if ((element.x === (checker.x + 1) & element.y === (checker.y - 1))
    || (element.x === (checker.x + 1) & element.y === (checker.y + 1))) {
    return true;
  }else{
    return false;
  }
}

function twoMovementDown(element,checker){
  if ((element.x === (checker.x + 2) & element.y === (checker.y - 2)) // two movement
    || (element.x === (checker.x + 2) & element.y === (checker.y + 2))) {
    return true;
  }else{
    return false;
  }
}

function oneMovementUp(element,checker){
  if ((element.x === (checker.x -1) & element.y === (checker.y - 1))
  || (element.x === (checker.x -1) & element.y === (checker.y + 1))) {
    return true;
  }else{
    return false;
  }
}

function twoMovementUp(element,checker){
  if ((element.x === (checker.x - 2) & element.y === (checker.y - 2)) 
  || (element.x === (checker.x - 2) & element.y === (checker.y + 2))) {
    return true;
  }else{
    return false;
  }
}

function convertInCrown(nextMovement,size){
  switch(nextMovement.x){
    case 0: return true;
    case size: return true;
    default: return false;
  }
}