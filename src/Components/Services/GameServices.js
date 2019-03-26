import { Service } from 'react-services-injector';


import firebaseApp from '../Services/FirebaseService';

class GameService extends Service {

    get matrix() {
        return new Promise(resolve => {firebaseApp.firebase_.
            firestore()
            .collection("stateGame")
            .doc("tTuDuPWESg6b2iUY4s8V")
            .get()
            .then(game => {
                resolve(game.data())
            })});
    }

    /*get sizeBox(size){
        switch (size) {
            case 16:
                
                return 8;
            case 36:
                return 8;
            default:
                break;
        }
    }

    get sizeElement(){

    }*/
}

GameService.publicName = 'GameService';

export default GameService;