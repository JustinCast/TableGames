const axios = require("axios");
import { fillList, addScore, updateGame } from "./logic-index";
// 563492ad6f91700001000001612c616fe761492fa5bcb3de87478a4a
// https://api.pexels.com/v1/curated?per_page=15&page=1
// https://api.pexels.com/v1/search?query=people&per_page=2
import db from "../config/config";
const extractedImgs = new Array();
let gameList = new Array();

function getImages(total) {
  return new Promise(r =>
    r(
      axios
        .get(`https://api.pexels.com/v1/curated?per_page=${total * 4}&page=1`, {
          headers: {
            Authorization:
              "563492ad6f91700001000001612c616fe761492fa5bcb3de87478a4a"
          }
        })
        .then(data => {
          return new Promise(resolve =>
            resolve(extractImgs(data.data.photos, total))
          );
        })
        .catch(e => console.log(e))
    )
  );
}

/**
 *
 * @param {*} data all imgs from pexels api
 * @param {*} size size of the matrix
 */
function extractImgs(data, size) {
  data.forEach(img => {
    //console.log(extractedImgs)
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
  for (let i = 0; i < array.length; i++) {
    array[i].img = extractedImgs[i];
    array[i].img2 =
      "https://firebasestorage.googleapis.com/v0/b/tablegames-4feca.appspot.com/o/question.png?alt=media&token=1e80093e-5d48-4ad6-8b3b-4838fd5a86d7";
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
            firstCheck: null
          };
          return game;
        })
        .catch(e => console.log(e))
    )
  );
}

export function playMemory(stateGameId, actualPlayer, object) {
  // recibir actualPlayer, game
  db.collection("stateGame").doc(stateGameId);
  get();
  then(state => {
    if (state) {
      if (state.firstCheck === null) state.firstCheck = object;
      else {
        if (compareCards(state.firstCheck, object)) {
          addScore(stateGameId, actualPlayer);
          blockCards(stateGameId, state.img)
          .then(updatedMtx => (
            updateGame(stateGameId, updatedMtx)
          ));
        }
      }
    }
  });
}

/**
 *
 * @param {*} firstObjectClicked objeto obtenido con el primer click
 * @param {*} secondObjectClicked objeto obtenido con el segundo click
 */
function compareCards(firstObjectClicked, secondObjectClicked) {
  return firstObjectClicked.img === secondObjectClicked.img;
}

function blockCards(stateGameId, imgURL) {
  return new Promise(resolve =>
    resolve(
      db
        .collection("stateGame")
        .doc(stateGameId)
        .get()
        .then(gameState => {
          return blockObjects(gameState.game, imgURL);
        })
    )
  );
}

function blockObjects(matrix, imgURL) {
  return matrix.filter(e => e.img === imgURL).forEach(e => (e.img = ""));
}
