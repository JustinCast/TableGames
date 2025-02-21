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
  updateFirstCheck,
  updateStatistics,
  updateWonGame
} from "./logic-index";
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
  data.forEach(img => {
    extractedImgs.push(img.src.tiny); //first img pair
    extractedImgs.push(img.src.tiny); //second img pair
  });
  gameList = fillList(size); 
  shuffleArray(extractedImgs);
  setImgsToMemoryArray(gameList);
  return gameList;
}

/**
 * set extracted imgs getted from pexels api to matrix created from logic-index
 * @param {*} array logic array created from logic-index
 */
function setImgsToMemoryArray(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].img = questionMark;
    array[i].img2 = extractedImgs[i];
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

/**
 *
 * @param {*} stateGameId identification of stateGame
 * @param {*} object object clicked
 */
export function playMemory(stateGameId, object, player) {
  db.collection("stateGame")
    .doc(stateGameId)
    .get()
    .then(querySnapshot => {
      let state = querySnapshot.data();
      if (state.firstCheck !== object){
        checkActualUser(player)
        .then(result => {
          if(result) {
            console.log(result)
            if (state) {
              if (state.firstCheck === null) updateFirstCheck(stateGameId, object);
              else {
                handleComparation(stateGameId, state, object, state.actualPlayer);
              }
            }
          }
        })
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
  return firstObjectClicked.img2 === secondObjectClicked.img2;
}

/**
 * This method flips card when first and second objects were clicked
 * @param {*} stateGameId identification of stateGame
 * @param {*} state the state of the game
 * @param {*} firstCheck first object clicked
 * @param {*} secondObjectClicked
 */
function flipCards(stateGameId, state, firstCheck, secondObjectClicked) {
  return new Promise(resolve => {
    state.game[
      state.game.findIndex(e => e.x === firstCheck.x && e.y === firstCheck.y)
    ].img = firstCheck.img2;
    state.game[
      state.game.findIndex(e => e.x === firstCheck.x && e.y === firstCheck.y)
    ].owner = firstCheck.owner;

    setTimeout(() => {
      updateGame(stateGameId, state.game)
        .then(() => {
          state.game[
            state.game.findIndex(
              e =>
                e.x === secondObjectClicked.x && e.y === secondObjectClicked.y
            )
          ].img = secondObjectClicked.img2;
          state.game[
            state.game.findIndex(
              e =>
                e.x === secondObjectClicked.x && e.y === secondObjectClicked.y
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
    }, 1500);
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
      flipCards(stateGameId, state, state.firstCheck, secondObjectClicked).then(
        () => {
          getNextUserInfo(stateGameId, player).then(data => {
            resetFirstCheck(stateGameId).then(() => {
              changeActualUser(stateGameId, data.player, data.gameName);
              checkIfGameEnded(stateGameId);
            });
          });
        }
      );
    } else {
      let first = {
        img2: questionMark,
        img: state.firstCheck.img,
        owner: state.firstCheck.owner,
        x: state.firstCheck.x,
        y: state.firstCheck.y
      };
      let second = {
        img2: questionMark,
        img: secondObjectClicked.img,
        owner: secondObjectClicked.owner,
        x: secondObjectClicked.x,
        y: secondObjectClicked.y
      };

      flipCards(stateGameId, state, state.firstCheck, secondObjectClicked).then(
        () => {
          flipCards(stateGameId, state, first, second).then(() => {
            getNextUserInfo(stateGameId, player).then(data => {
              resetFirstCheck(stateGameId).then(() => {
                changeActualUser(stateGameId, data.player, data.gameName);
              });
            });
          });
        }
      );
    }
  });
}

function endGame(stateGameId, winner) {
  db.collection("session")
    .where("stateGameId", "==", stateGameId)
    .get()
    .then(querySnapshot => {
      let users = querySnapshot.docs[0].data().users;
      winner === true && users[1] !== null
        ? updateStatistics(users[0], users[1])
        : updateStatistics(users[1], users[0]);
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
              e.img2 === state.firstCheck.img2
          )
        ];
      handleComparation(stateGameId, state, pair, null);
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
    e => e.img2 !== array[randomLocation].img2 && !e.owner
  );
  return filteredArray[Math.floor(Math.random() * filteredArray.length)];
}

function checkActualUser(actualPlayer) {
  return new Promise(resolve => {
    db.collection("stateGame")
      .where("actualPlayer", "==", actualPlayer)
      .get()
      .then(querySnapshot => {
        if(querySnapshot.docs[0])
          resolve(true)
        else
          resolve(false)
      });
  });
}

function checkIfGameEnded(stateGameId) {
  db.collection("stateGame")
    .doc(stateGameId)
    .get()
    .then(data => {
      let state = data.data();
      if (state.game.filter(e => e.owner === false).length === 0) {
        let winner;
        state.scores.p1Score > state.scores.p2Score
          ? (updateWonGame(stateGameId, "El jugador 1 ha ganado el juego"),
            (winner = true))
          : (updateWonGame(stateGameId, "El jugador 2 ha ganado el juego"),
            (winner = false));

        if (state.scores.p1Score === state.scores.p2Score)
          updateWonGame(stateGameId, "Los jugadores han quedado empatados");
        endGame(stateGameId, winner);
      }
    });
}
