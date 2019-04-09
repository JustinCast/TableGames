const axios = require("axios");
import {
  fillList,
  addScore,
  updateGame,
  changeActualUser,
  getDifficulty,
  getProbability,
  getNextUserInfo,
  resetFirstCheck,
  updateFirstCheck
} from "./logic-index";
// 563492ad6f91700001000001612c616fe761492fa5bcb3de87478a4a
// https://api.pexels.com/v1/curated?per_page=15&page=1
// https://api.pexels.com/v1/search?query=people&per_page=2
import db from "../config/config";
let extractedImgs = new Array();
let gameList = new Array();

const questionMark =
  "https://firebasestorage.googleapis.com/v0/b/tablegames-4feca.appspot.com/o/icognito.png?alt=media&token=cb9a6cc0-0a4a-4f98-9046-0440466e7562";

function getImages(total) {
  return new Promise(r =>
    r(
      axios
        .get(
          `https://api.pexels.com/v1/curated?per_page=${(total * total) /
            2}&page=1`,
          {
            headers: {
              Authorization:
                "563492ad6f91700001000001612c616fe761492fa5bcb3de87478a4a"
            }
          }
        )
        .then(data => {
          return new Promise(resolve =>
            resolve(extractImgs(data.data.photos, total))
          );
        })
        .catch(e => console.log(`ERROR GETTING IMAGES: ${e}`))
    )
  );
}

/**
 *
 * @param {*} data all imgs from pexels api
 * @param {*} size size of the matrix
 */
function extractImgs(data, size) {
  extractedImgs = [];
  console.log(`IMGS FROM API: ${data.length}`);
  data.forEach(img => {
    extractedImgs.push(img.src.tiny); //first img pair
    extractedImgs.push(img.src.tiny); //second img pair
  });
  gameList = fillList(size); // get the logic matrix created from logic-index
  shuffleArray(extractedImgs);
  setImgsToMemoryArray(gameList);
  return gameList;
}

/**
 * set extracted imgs getted from pexels api to matrix created from logic-index
 * @param {*} array logic array created from logic-index
 */
function setImgsToMemoryArray(array) {
  console.log(`ARRAY LENGHT: ${array.length}`);
  console.log(`IMGS LENGHT: ${extractedImgs.length}`);
  for (let i = 0; i < array.length; i++) {
    array[i].img = extractedImgs[i];
    array[i].img2 = questionMark;
  }
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

/**
 * Where the memory game build start
 * @param {*} size matrix size
 */
export async function memoryInit(size) {
  return new Promise(resolve =>
    resolve(
      getImages(size)
        .then(data => {
          let game = {
            game: data,
            scores: {
              p1Score: 0,
              p2Score: 0
            },
            firstCheck: null,
            wonGame: null
          };
          return game;
        })
        .catch(e => console.log(`ERROR INITING MEMORY: ${e}`))
    )
  );
}

export function playMemory(stateGameId, object) {
  db.collection("stateGame")
    .doc(stateGameId)
    //.where("actualPlayer", "==", player)
    .get()
    .then(querySnapshot => {
      // TODO: recordar usar el where
      let state = querySnapshot.data();
      if (state) {
        if (state.firstCheck === null) updateFirstCheck(stateGameId, object);
        else {
          handleComparation(stateGameId, state, object, state.actualPlayer);
        }
      }
    })
    .catch(err => console.log(`ERROR PLAYING MEMORY : ${err}`));
}

/**
 *
 * @param {*} firstObjectClicked objeto obtenido con el primer click
 * @param {*} secondObjectClicked objeto obtenido con el segundo click
 */
function compareCards(firstObjectClicked, secondObjectClicked) {
  return firstObjectClicked.img === secondObjectClicked.img;
}

function flipCards(stateGameId, state, firstCheck, secondObjectClicked) {
  return new Promise(resolve => {
    state.game[
      state.game.findIndex(e => e.x === firstCheck.x && e.y === firstCheck.y)
    ].img2 = firstCheck.img;
    state.game[
      state.game.findIndex(e => e.x === firstCheck.x && e.y === firstCheck.y)
    ].owner = firstCheck.owner;

    updateGame(stateGameId, state.game)
      .then(() => {
        state.game[
          state.game.findIndex(
            e => e.x === secondObjectClicked.x && e.y === secondObjectClicked.y
          )
        ].img2 = secondObjectClicked.img;
        state.game[
          state.game.findIndex(
            e => e.x === secondObjectClicked.x && e.y === secondObjectClicked.y
          )
        ].owner = secondObjectClicked.owner;
        updateGame(stateGameId, state.game)
          .then(() => {
            resolve(true);
          })
          .catch(error =>
            console.log(`INNER ERROR ON SECOND GAME UPDATE ${error}`)
          );
      })
      .catch(error =>
        console.log(`Error en flipCards al actualizar el juego ${error}`)
      );
  });
}

function flipCard(stateGameId, state, object) {
  return new Promise(resolve => {
    state.game[
      state.game.findIndex(e => e.x === object.x && e.y === object.y)
    ].img2 = object.img;

    updateGame(stateGameId, state.game).then(() => {
      resolve(true);
    });
  });
}

/**
 *
 * @param {*} stateGameId identificador del estado del juego
 * @param {*} state estado del juego
 * @param {*} secondObjectClicked segundo objeto clickeado
 * @param {*} player jugador
 */
function handleComparation(stateGameId, state, secondObjectClicked, player) {
  return new Promise(() => {
    if (compareCards(state.firstCheck, secondObjectClicked)) {
      addScore(stateGameId, player);
      state.firstCheck.owner = true;
      secondObjectClicked.owner = true;
      flipCards(
        stateGameId,
        state,
        state.firstCheck,
        secondObjectClicked
      ).then(() => {
        getNextUserInfo(stateGameId, player).then(data => {
          resetFirstCheck(stateGameId).then(() => {
            changeActualUser(stateGameId, data.player, data.gameName);
          });
        });
      });
    } else {
      /*let img1 = state.firstCheck.img;
          let img2 = secondObjectClicked.img;*/
      /*state.firstCheck.img = img1;
      secondObjectClicked.img = img2;*/

      let s = {
        img: questionMark,
        img2: state.firstCheck.img2,
        owner: state.firstCheck.owner,
        x: state.firstCheck.x,
        y: state.firstCheck.y
      };
      let b = {
        img: questionMark,
        img2: secondObjectClicked.img2,
        owner: secondObjectClicked.owner,
        x: secondObjectClicked.x,
        y: secondObjectClicked.y
      };

      console.log(JSON.stringify(secondObjectClicked));

      flipCards(
        stateGameId,
        state,
        state.firstCheck,
        secondObjectClicked
      ).then(() => {
        flipCards(
          stateGameId,
          state,
          s,
          b
        ).then(() => {
          getNextUserInfo(stateGameId, player).then(data => {
            resetFirstCheck(stateGameId).then(() => {
              changeActualUser(stateGameId, data.player, data.gameName);
            });
          });
        });
      });
    }
  });
}

/**
 *
 * @param {*} stateGameId identificador del estado de juego de la sesión
 * @param {*} state estado de juego de la sesión
 */
export function cpuPlayer(stateGameId, state) {
  //test(state.game);
  getDifficulty(stateGameId).then(difficulty => {
    let randomLocation = Math.floor(Math.random() * state.game.length); // se escoge una carta random
    while (state.game[randomLocation].owner) {
      randomLocation = Math.floor(Math.random() * state.game.length);
    }
    state.firstCheck = state.game[randomLocation];
    if (getProbability(difficulty)) {
      let pair =
        state.game[
          state.game.findIndex(
            e =>
              JSON.stringify(e) !== JSON.stringify(state.firstCheck) &&
              e.img === state.firstCheck.img
          )
        ];
      handleComparation(stateGameId, state, pair, null);
      //.catch(error => console.log(error));
    } else {
      handleComparation(
        stateGameId,
        state,
        getRandomElementFromArray(state.game, randomLocation),
        null
      );
    }
  });
}

/**
 * Metodo que obtiene un elemento random de un array distinto de uno previamente obtenido
 * @param {*} array array para obtener el elemento
 * @param {*} randomLocation posición de la cual debe ser distinto el elemento obtenido
 */
function getRandomElementFromArray(array, randomLocation) {
  let filteredArray = array.filter(
    e => e.img !== array[randomLocation].img && !e.owner
  );
  //console.log(`FILTERED ARRAY: ${JSON.stringify(filteredArray)}`)
  return filteredArray[Math.floor(Math.random() * filteredArray.length)];
}

// test code

function test(game) {
  let aux = [];
  game.forEach(e => {
    if (!aux.includes(e)) {
      let elements = game.filter(o => o.img === e.img);
      if (elements.length === 2) {
        console.log(
          `EL ELEMENTO ${elements[0].x}, Y:${elements[0].y} \n tiene pareja`
        );
        aux.push(elements[0]);
        aux.push(elements[1]);
      } else {
        console.log(
          `EL ELEMENTO X: ${elements[0].x}, Y:${
            elements[0].y
          } \n NO tiene pareja`
        );
        aux.push(elements[0]);
      }
    }
  });

  console.log(
    "\n\n##################################################################################"
  );
}
