const axios = require('axios');
// 563492ad6f91700001000001612c616fe761492fa5bcb3de87478a4a
// https://api.pexels.com/v1/curated?per_page=15&page=1
// https://api.pexels.com/v1/search?query=people&per_page=2
export default function getImages(total) {
  axios.get(`https://api.pexels.com/v1/curated?per_page=${total}&page=1`, {
    headers: { Authorization: "563492ad6f91700001000001612c616fe761492fa5bcb3de87478a4a" }
  }).then(data => {
    extractImgs(data.data.photos);
  });
}

function extractImgs(data) {
  data.forEach(img => {
    console.log(img.src.tiny);
  });
}