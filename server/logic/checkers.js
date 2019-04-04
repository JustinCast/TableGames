import {
  fillList
} from "./logic-index";
// firestore instance
import db from "../config/config";
import { addScore, getDifficulty, getProbability} from "./logic-index";
// Images
const square_black =
  "https://firebasestorage.googleapis.com/v0/b/tablegames-4feca.appspot.com/o/black_square.png?alt=media&token=33c73aa8-d651-4b4f-82de-097c01cdaac4";
const square_white =
  "https://firebasestorage.googleapis.com/v0/b/tablegames-4feca.appspot.com/o/white_square.png?alt=media&token=2439fb8c-86f3-442b-9ddd-5e18580e23d8";
const blue_token =
  "https://firebasestorage.googleapis.com/v0/b/tablegames-4feca.appspot.com/o/blue_token.png?alt=media&token=8f8e309f-052b-4a87-a18b-637fa884baad";
const red_token =
  "https://firebasestorage.googleapis.com/v0/b/tablegames-4feca.appspot.com/o/red_token.png?alt=media&token=0e734f98-c4b9-4474-836e-1dc8b9cd9937";
const redCrown_token =
  "https://firebasestorage.googleapis.com/v0/b/tablegames-4feca.appspot.com/o/redCrown_token.png?alt=media&token=384ac3e1-c149-4a4b-8235-88d196bd8f4d";
const blueCrown_token =
  "https://firebasestorage.googleapis.com/v0/b/tablegames-4feca.appspot.com/o/blueCrown_token.png?alt=media&token=fa454b24-e8ce-4ef0-ae7c-6a8e689b02b9";


export let game = [];

// Method to fill default checker game
export function fillDefaultCheck(size) {
  let checkerGame = fillList(size);
  checkerGame.forEach(element => {
    if (element.x < 3) {
      // Player 1
      if (
        ((element.x % 2 === 0) & (element.y % 2 === 0)) |
        ((element.x % 2 !== 0) & (element.y % 2 !== 0))
      ) {
        element.img = blue_token;
        element.owner = false; // Is player one
      } else {
        element.owner = null;
        element.img = square_white;
      }
    } else {
      if (element.x > size - 4) {
        if (
          ((element.x % 2 === 0) & (element.y % 2 === 0)) |
          ((element.x % 2 !== 0) & (element.y % 2 !== 0))
        ) {
          element.img = red_token;
          element.owner = true; // Is player two
        } else {
          element.owner = null;
          element.img = square_white;
        }
      } else {
        if (
          ((element.x % 2 === 0) & (element.y % 2 === 0)) |
          ((element.x % 2 !== 0) & (element.y % 2 !== 0))
        ) {
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
  };

  return game;
}
// Logic Machine
export function machineLogicChecker(stateGameId){
  let allClicks = [];
  let checkers = getCheckersMachine(stateGameId);
  checkers.forEach(e =>{
    allClicks.push(getAllMovementsMachineCheckers(stateGameId,e));
  })
  //Filter Cleaner movements
  allClicks = allClicks.filter(e => e.movements.length >0).slice();
  // This is the best option to machine
  selectedChecker = getMovementMachine(allClicks);
  
  if(getProbability(getDifficulty(stateGameId))){ // get True
    isMovementValid(selectedChecker.checker,selectedChecker.nextMovement,stateGameId,null);
  }else{
    selectedChecker = allClicks[getRandomNumber(allClicks.length)];
    isMovementValid(
      selectedChecker.checker,
      selectedChecker.movements[getRandomNumber(selectedChecker.movements.length)],
      stateGameId,null);
  }
}



function getMovementMachine(allClicks){
  allClicks.forEach(e => {
    if(e.movements.length > 1){
      return({
        checker: e.checker,
        nextMovement: e.movements[getRandomNumber(e.movements.length)]
      })
    }else{
      e.movements.forEach(pos => {
        if(twoMovementUp(e.checker,pos) | twoMovementDown(e.checker,pos)){ // It eat
          return({
            checker: e.checker,
            nextMovement: pos})
        }
      })
    }
     return({
       checker: e.checker,
       nextMovement: e.movements[getRandomNumber(e.movements.length)]
     })
  })
}

function getRandomNumber(size){
  return Math.floor((Math.random() * size) + 0);
}

function getAllMovementsMachineCheckers(stateGameId, checker){
  return new Promise(r => {
    let movements = [];
    db.collection("stateGame")
      .doc(stateGameId)
      .get()
      .then(data => {
        if(checker.img !== redCrown_token){
          if(twoMovementUpMachine(checker, data) !== null){
            movements.push(twoMovementUpMachine(checker, data));
          }else{
            oneMovementUpMachine(checker,data).forEach(e => movements.push(e)); 
          }
        }
        else{
          if(twoMovementUpMachine(checker, data) !== null){
            movements.push(twoMovementUpMachine(checker, data));
          }else if(twoMovementDownMachine(checker,data) !== null){
            movements.push(twoMovementDownMachine(checker,data));
          }else {
            oneMovementUpMachine(checker,data).forEach(e => movements.push(e)); 
            oneMovementDownMachine(checker,data).forEach(e => movements.push(e));
          }
          
     
        }
        r({
          checker: checker,
          movements: movements
        })
      })

      
  })
}

function getCheckersMachine(stateGameId){
  return new Promise(r =>{
    db.collection("stateGame")
      .doc(stateGameId)
      .get()
      .then(data => {
        r(data.game.filter(e => e.owner === true));
      })
  })
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
        }
         else {
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

export function isMovementValid(checker, nextMovement, stateGameId, actualPlayer) {
  return new Promise(r => {
    db.collection("stateGame")
      .doc(stateGameId)
      .get()
      .then(data => {
        this.game = data.game.slice();
        for (let i = 0; i < this.game.length; i++) {
          if ((this.game[i].x === nextMovement.x) & (this.game[i].y === nextMovement.y)) {
            if (checker.img === redCrown_token || checker.img === blueCrown_token) { // Is Crown ?
              checkerCrown(i, checker,stateGameId,actualPlayer);
              r(true);
            }else{
              if (checker.owner === false) { // Is checker of player one ?   
                checkerPlayerOne(i, checker, nextMovement,stateGameId,actualPlayer);
                r(true);
              } else if (checker.owner == true) { // Is checker of plyer two ?
                checkerPlayerTwo(i, checker, nextMovement,stateGameId,actualPlayer);
                r(true);
              }else{
                r(false);
              }
            }
          }
        }
      });
  })
};
function checkerCrown(i, checker, stateGameId, actualPlayer){
  if (this.game[i].owner === null & (oneMovementUp(this.game[i], checker) || oneMovementDown(this.game[i], checker))) {
    pintingChecker(i, checker);
    removeLastPosition(checker);
  } else if (this.game[i].owner === null & 
        (twoMovementUp(this.game[i], checker) || twoMovementDown(this.game[i], checker))) {
    for (let j = 0; j < this.game.length; j++) {
      if ((oneMovementUp(this.game[j], checker) || oneMovementDown(this.game[j], checker))&
       (this.game[j].owner ===  false & checker.owner === true) ||(this.game[j].owner ===  true & checker.owner === false) ) {
        this.game[j].img = square_black;
        addScore(stateGameId,actualPlayer);
      }
    }
    pintingChecker(i, checker);
    removeLastPosition(checker);
  }  
}
function checkerPlayerTwo(i, checker, nextMovement,stateGameId, actualPlayer) {
  if (oneMovementUp(this.game[i], checker)) {
    if (this.game[i].owner === null) {
      if (convertInCrown(nextMovement, this.game.length)) {
        this.game[i].img = redCrown_token;
      } else {
        pintingChecker(i, checker);
      }
      removeLastPosition(checker);
    } else if ((this.game[i].owner === null) & twoMovementUp(this.game[i], checker)) {
      for (let j = 0; j < this.game.length; j++) {
        if (oneMovementUp(this.game[j], checker) & this.game[j].owner === false) {
          this.game[j].img = square_black;
       
          addScore(stateGameId,actualPlayer);
        }
      }
      pintingChecker(i, checker);
      removeLastPosition(checker);
    }
  }
}

function checkerPlayerOne(i, checker, nextMovement,stateGameId, actualPlayer) {
  if (oneMovementDown(this.game[i], checker) & (this.game[i].owner === null)) {
    if (convertInCrown(nextMovement, this.game.length)) {
      this.game[i].img = blueCrown_token;
    } else {
      pintingChecker(i, checker);
    }
    removeLastPosition(checker);
    //TODO: camibiar de jugador
  } else if ((this.game[i].owner === null) & twoMovementDown(this.game[i], checker)) {
    for (let j = 0; j < this.game.length; j++) {
      if (oneMovementDown(this.game[j], checker) & this.game[j].owner === true) {
        this.game[j].img = square_black;
        addScore(stateGameId,actualPlayer);
      }
    }
    pintingChecker(i, checker);
    removeLastPosition(checker);

  }
}



function pintingChecker(i, checker) {
  switch (checker.img) {
    case blue_token:
      this.game[i].img = blue_token;
      break;
    case red_token:
      this.game[i].img = red_token;
      break;
    case redCrown_token:
      this.game[i].img = redCrown_token;
      break;
    case blueCrown_token:
      this.game[i].img = blueCrown_token;
      break;
  }
}

function removeLastPosition(checker) {
  for (let i = 0; i < this.game.length; i++) {
    if ((this.game[i].x === checker.x) & (this.game[i].y === checker.y)) {
      this.game[i].img = square_black;
      this.game[i].owner = null;
    }
  }
}
function oneMovementDownMachine(checker,data) {
  let positions = data.game.filter(e => ((e.x === checker.x + 1) & (e.y === checker.y - 1))
              || ((e.x === checker.x + 1) & (e.y === checker.y + 1)));
  return positions.filter(e => e.owner === null);
}
function oneMovementDown(element, checker) {
  if (
    (element.x === checker.x + 1) & (element.y === checker.y - 1) ||
    (element.x === checker.x + 1) & (element.y === checker.y + 1)
  ) {
    return true;
  } else {
    return false;
  }
}
function twoMovementDownMachine(checker,data) {
  let positions = data.game.filter(e => (((e.x === checker.x + 2) & (e.y === checker.y - 2))
              || ((e.x === checker.x + 2) & (e.y === checker.y + 2))) & e.owner == null);
  data.game.forEach(e => {
    positions.forEach(pos => {
      if(oneMovementDown(e,checker) & e.owner == false & oneMovementDown(pos,e)){
        return pos
      }
    });
  })
  
  return null
}
function twoMovementDown(element, checker) {
  if (
    (element.x === checker.x + 2) & (element.y === checker.y - 2) || // two movement
    (element.x === checker.x + 2) & (element.y === checker.y + 2)
  ) {
    return true;
  } else {
    return false;
  }
}

function oneMovementUpMachine(checker,data) {
  let positions = data.game.filter(e => ((e.x === checker.x - 1) & (e.y === checker.y - 1))
              || ((e.x === checker.x - 1) & (e.y === checker.y + 1)));
  return positions.filter(e => e.owner === null);
}
function oneMovementUp(element, checker) {
  if (
    (element.x === checker.x - 1) & (element.y === checker.y - 1) ||
    (element.x === checker.x - 1) & (element.y === checker.y + 1)
  ) {
    return true;
  } else {
    return false;
  }
}
function twoMovementUpMachine(checker,data) {
  let positions = data.game.filter(e => (((e.x === checker.x - 2) & (e.y === checker.y - 2))
              || ((e.x === checker.x - 2) & (e.y === checker.y + 2))) & e.owner == null);
  data.game.forEach(e => {
    positions.forEach(pos => {
      if(oneMovementUp(e,checker) & e.owner == false & oneMovementUp(pos,e)){
        return pos
      }
    });
  })
  
  return null
}
function twoMovementUp(element, checker) {
  if (
    (element.x === checker.x - 2) & (element.y === checker.y - 2) ||
    (element.x === checker.x - 2) & (element.y === checker.y + 2)
  ) {
    return true;
  } else {
    return false;
  }
}

function convertInCrown(nextMovement, size) {
  switch (nextMovement.x) {
    case 0:
      return true;
    case size - 1:
      return true;
    default:
      return false;
  }
}