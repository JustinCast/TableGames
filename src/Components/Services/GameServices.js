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
                    resolve(doc.data());
                });
        });
    }

    sendMessage(text){
        console.log(JSON.parse(localStorage.getItem('actualUser')).name+ text);
    }

    get messages(){
        return new Promise(resolve=>{
            resolve([{name:"luis",text:"lk jshkfa akjhdkjfa kjhasjkfh jkas fj akjshfkjhasjkh asdfjhkas kjhdsfjha kj kjhaskjf jkhkjasdfh jhasdfjkh jbasfkjbajksbgkjag"},{name:"pepe",text:"hola"},{name:"luis",text:"que?"},{name:"luis",text:"lk jshkfa akjhdkjfa kjhasjkfh jkas fj akjshfkjhasjkh asdfjhkas kjhdsfjha kj kjhaskjf jkhkjasdfh jhasdfjkh jbasfkjbajksbgkjag"},{name:"pepe",text:"hola"},{name:"luis",text:"que?"}])
        })
    }
}

GameService.publicName = 'GameService';

export default GameService;