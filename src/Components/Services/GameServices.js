import {
    Service
} from 'react-services-injector';
import {
    GraphQLClient
} from "../../index";
import gql from "graphql-tag";

import firebaseApp from '../Services/FirebaseService';

class GameService extends Service {
    get matrix() {
        return new Promise(resolve => {
            firebaseApp.firebase_.
                firestore()
                .collection("stateGame")
                .doc("hpGwIgBb5iHlJTxKk4dH")
                .get()
                .then(game => {
                    resolve(game.data())
                })
        });
    }

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
            if (data != null) {
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


    sizeBox(size) {
        this.currentSize="";
        if (size == 25) //5*5
            this.currentSize = "44%";
        if (size == 36) //6*6
            this.currentSize = "45%";
        if (size == 89) //7*7
            this.currentSize = "43%";
        if (size == 64) //8*8
            this.currentSize = "39%";
    }


    get getSizeBox() {
        return this.currentSize;
    }


}

GameService.publicName = 'GameService';

export default GameService;