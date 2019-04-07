import {
    Service
} from 'react-services-injector';
import {
    GraphQLClient
} from "../../index";
import gql from "graphql-tag";

import firebaseApp from '../Services/FirebaseService';

class GameService extends Service {

    sentClick(stateGameId, actualUser, click) {
        GraphQLClient.mutate({
            variables: {
                input: {
                    stateGameId: stateGameId,
                    player: actualUser,
                    object: JSON.stringify(click)
                }
            },
            mutation: gql`
        mutation click($input: ClickObjectInputType!) {
          click(input: $input) {
            stateGameId
          }
        }
      `
        }).then(data => {
            if (data !== null) {
                //TODO: retorna algo
                console.log(data);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    setElement(element) {
        this.stateGameId = element;
    }

    get getElement() {
        return this.stateGameId;
    }

    get newMatrix() {
        return new Promise(resolve => {
            firebaseApp.firebase_
                .firestore()
                .collection("stateGame")
                .doc(this.stateGameId + "")
                .onSnapshot(function (doc) {
                    resolve(
                        doc.data());
                });
        });
    }


    /*set sizeBox(size) {
        this.currentSize = size;
        console.log(this.currentSize);
    }


    get getSizeBox() {
        this.elemet="";
        if (this.currentSize === 25) //5*5
            this.element = "44%";
        if (this.currentSize === 36) //6*6
            this.element = "45%";
        if (this.currentSize === 89) //7*7
            this.element = "43%";
        if (this.currentSize === 64) //8*8
            this.element = "39%";


        return this.element;
    }*/


}

GameService.publicName = 'GameService';

export default GameService;