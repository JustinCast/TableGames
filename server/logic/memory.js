const axios = require("axios");
import { fillList } from "./logic-index";
// 563492ad6f91700001000001612c616fe761492fa5bcb3de87478a4a
// https://api.pexels.com/v1/curated?per_page=15&page=1
// https://api.pexels.com/v1/search?query=people&per_page=2

const extractedImgs = new Array();
let gameList = new Array();

function getImages(total) {
  return new Promise(r =>
    r(
      axios
        .get(
          `https://api.pexels.com/v1/curated?per_page=${total * total}&page=1`,
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
        .catch(e => console.log(e))
    )
  );
}

function extractImgs(data, size) {
  data.forEach(img => {
    //console.log(extractedImgs)
    extractedImgs.push(img.src.tiny); //first img pair
    extractedImgs.push(img.src.tiny); //second img pair
  });
  gameList = fillList(size);
  shuffleArray(extractedImgs);
  setImgsToMemoryArray(gameList);
  return gameList;
}

function setImgsToMemoryArray(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].img = extractedImgs[i];
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

export async function memoryInit(size) {
  return new Promise(resolve =>
    resolve(
      getImages(size)
        .then(data => {
          let game = {
            game: data,
            scores:{
              p1Score: 0,
              p2Score: 0
            }
        }
          return game;
        })
        .catch(e => console.log(e))
    )
  );
}
