import { fillList } from './logic-index';
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
export function fillDefaultCheck(size){
    let checkerGame = fillList(size);
    checkerGame.forEach(element =>{
        if(element.x <3){ // Player 1
            if((element.x %2 === 0 & element.y %2 ===0) | (element.x %2 !== 0 & element.y %2 !==0)){
                element.img = blue_token;
                 element.token = false; // Is player one
            }else{
                element.token = null;
                 element.img = square_white;
            }
        }else{
            if(element.x > size-3){
                if((element.x %2 === 0 & element.y %2 ===0) | (element.x %2 !== 0 & element.y %2 !==0)){
                    element.img = red_token;
                     element.token = false; // Is player one
                }else{
                    element.token = null;
                     element.img = square_white;
                }
            }else{
                if((element.x %2 === 0 & element.y %2 ===0) | (element.x %2 !== 0 & element.y %2 !==0)){
                    element.img = square_black;
                     element.token = null; // Is player one
                }else{
                    element.token = null;
                     element.img = square_white;
                }
            }
        }
    });
    let game = {
        game: checkerGame,
        scores:{
            p1Score: 0,
            p2Score: 0
        }
    }
    return game;
}