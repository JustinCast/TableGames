import { Service } from 'react-services-injector';


import firebaseApp from '../Services/FirebaseService';

class GameService extends Service {

    get newMatrix(){
        
        return new Promise(resolve => {
            firebaseApp.firebase_
            .firestore()
            .collection("stateGame")
            .doc("kr4WedJ6oqrAyx0dOgtv")
            .onSnapshot(function(doc) {
                resolve(doc.data());
                console.log(doc.data().game);
            });
        });
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