export default function fillList(size) {
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