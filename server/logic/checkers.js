import {
  fillList
} from "./logic-index";
// firestore instance
import db from "../config/config";
import { 
  addScore,
  getDifficulty,
  getProbability,
  getNextUserInfo,
  resetFirstCheck,
  changeActualUser,
  updateGame} from "./logic-index";
// Images
export const square_black =
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
  getCheckersMachine(stateGameId).then(r => {
    r.forEach(e =>{
      getAllMovementsMachineCheckers(stateGameId,e).then( mov =>{
        if(mov.movements.length > 0)   allClicks.push(mov) 
      });
      
    })
    // This is the best option to machine
    let selectedChecker = getMovementMachine(allClicks);
    console.log(selectedChecker);

    
    //console.log(selectedChecker);
    /*if(getProbability(getDifficulty(stateGameId))){ // get True
      isMovementValid(selectedChecker.checker,selectedChecker.nextMovement,stateGameId,null);
    }else{
      selectedChecker = allClicks[getRandomNumber(allClicks.length)];
      isMovementValid(
        selectedChecker.checker,
        selectedChecker.movements[getRandomNumber(selectedChecker.movements.length)],
        stateGameId,null);
    }*/
  });
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
      .then(res => {
        let data = res.data();
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
        r(data.data().game.filter(e => e.owner === true));
      })
  })
}
// Check if element is checker and owner checker
export function isCheckerPlayer(stateGameId, playerId, checker) {
  return new Promise(r => {
    db.collection("session")
      .where("stateGameId", "==", stateGameId)
      .get()
      .then(querySnapshot => {
        let data = querySnapshot.docs[0].data();
    
        if (data.users[0].uid === playerId) {
          // Player one
          if(checker.img === square_black) r(true)
          else if (checker.owner === false) {
            // Checker owner is player one
            r(true);
          } else {
            r(false);
          }
        }
         else {
          // Player two
          if(checker.img === square_black) r(true)
          else if (checker.owner === true) {
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
        game = data.data().game.slice();
        for (let i = 0; i < game.length; i++) {
          if ((game[i].x === nextMovement.x) & (game[i].y === nextMovement.y)) {
            if (checker.img === redCrown_token || checker.img === blueCrown_token) { // Is Crown ?
              console.log("Es corona");
              //checkerCrown(i, checker,stateGameId,actualPlayer);
              r(true);
            }else{
              if (checker.owner === false) { // Is checker of player one ?   
                checkerPlayerOne(i, checker, nextMovement,stateGameId,actualPlayer);
                r(true);
              } else if (checker.owner == true) { // Is checker of plyer two ?
                console.log("Es player dos");
                //checkerPlayerTwo(i, checker, nextMovement,stateGameId,actualPlayer);
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
  if (game[i].owner === null & (oneMovementUp(game[i], checker) || oneMovementDown(game[i], checker))) {
    pintingChecker(i, checker); 
    getNextUserInfo(stateGameId, actualPlayer).then(data => {
      resetFirstCheck(stateGameId).then(() => {
        changeActualUser(stateGameId, data.player, data.gameName);
      });
    });   
  } else if (game[i].owner === null & 
        (twoMovementUp(game[i], checker) || twoMovementDown(game[i], checker))) {
    for (let j = 0; j < game.length; j++) {
      if ((oneMovementUp(game[j], checker) || oneMovementDown(game[j], checker))&
       (game[j].owner ===  false & checker.owner === true) ||(game[j].owner ===  true & checker.owner === false) ) {
        game[j].img = square_black;
        pintingChecker(i, checker);
        addScore(stateGameId,actualPlayer);
        
      }
    }
  }  
}
function checkerPlayerTwo(i, checker, nextMovement,stateGameId, actualPlayer) {
  if (oneMovementUp(game[i], checker)) {
    if (game[i].owner === null) {
      if (convertInCrown(nextMovement, game.length)) {
        checker.img = redCrown_token;
      }
      pintingChecker(i, checker);
      getNextUserInfo(stateGameId, actualPlayer).then(data => {
        resetFirstCheck(stateGameId).then(() => {
          changeActualUser(stateGameId, data.player, data.gameName);
        });
      });
    } else if ((game[i].owner === null) & twoMovementUp(game[i], checker)) {
      for (let j = 0; j < game.length; j++) {
        if (oneMovementUp(game[j], checker) & game[j].owner === false) {
          game[j].img = square_black;
          pintingChecker(i, checker);
          addScore(stateGameId,actualPlayer);
        }
      }
    }
  }
}

function checkerPlayerOne(i, checker, nextMovement,stateGameId, actualPlayer) {
  if (oneMovementDown(game[i], checker) & (game[i].owner === null)) {
    if (convertInCrown(nextMovement, game.length)) {
      checker.img = blueCrown_token;
    }
    pintingChecker(i, checker);
    updateGame(stateGameId,game).then( () => {
      getNextUserInfo(stateGameId, actualPlayer).then(data => {
        resetFirstCheck(stateGameId).then(() => {
          changeActualUser(stateGameId, data.player, data.gameName);
        });
      });
    });
  } else if ((game[i].owner === null) & twoMovementDown(game[i], checker)) {
    for (let j = 0; j < game.length; j++) {
      if (oneMovementDown(game[j], checker) & game[j].owner === true) {
        game[j].img = square_black;
        pintingChecker(i, checker);
        updateGame(stateGameId,game).then( () => {
          addScore(stateGameId,actualPlayer);
        })
      }
    }
  }
}



function pintingChecker(i, checker) {
  for (let i = 0; i < game.length; i++) {
    if(game[i].x === checker.x & game[i].y === checker.y){ game[i].img = square_black; game[i].owner = null}
  }
  switch (checker.img) {
    case blue_token:
      game[i].img = blue_token;
      game[i].owner = false;
      break;
    case red_token:
      game[i].img = red_token;
      game[i].owner = true;
      break;
    case redCrown_token:
      game[i].img = redCrown_token;
      game[i].owner = true;
      break;
    case blueCrown_token:
      game[i].img = blueCrown_token;
      game[i].owner = false;
      break;
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