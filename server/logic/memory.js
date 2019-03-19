const axios = require("axios");
import { fillList } from "./logic-index";
// 563492ad6f91700001000001612c616fe761492fa5bcb3de87478a4a
// https://api.pexels.com/v1/curated?per_page=15&page=1
// https://api.pexels.com/v1/search?query=people&per_page=2

let extractedImgs = new Array();
function getImages(total, size) {
  axios
    .get(`https://api.pexels.com/v1/curated?per_page=${total}&page=1`, {
      headers: {
        Authorization:
          "563492ad6f91700001000001612c616fe761492fa5bcb3de87478a4a"
      }
    })
    .then(data => {
      extractImgs(data.data.photos, size);
    })
    .catch(e => console.log(e));
}

function extractImgs(data, size) {
  data.forEach(img => {
    //console.log(extractedImgs)
    extractedImgs.push(img.src.tiny); //first img pair
    extractedImgs.push(img.src.tiny); //second img pair
  });
  let array = fillList(size);
  setImgsToMemoryArray(array);
}

function setImgsToMemoryArray(array) {
  for (let i = 0; i < array.length; i += 2) {
    array[i].img = extractedImgs[i]; // set first image pair
    array[i + 1].img = extractedImgs[i + 1]; // set second image pair
  }
}

export default async function memoryInit(size) {
  getImages(size);
}
