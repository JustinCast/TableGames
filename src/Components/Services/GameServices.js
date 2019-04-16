import {
    Service
} from 'react-services-injector';
import {
    GraphQLClient
} from "../../index";
import gql from "graphql-tag";
import firebaseApp from '../Services/FirebaseService';

class GameService extends Service {

    sendMessage(text, paramStateGame, messages) {
        if (text!=="") {
            let allMessges = messages;
            let message = {
                name: JSON.parse(localStorage.getItem('actualUser')).name,
                text: text
            }
            allMessges.push(message);
            firebaseApp.firebase_
                .firestore()
                .collection("messages").doc(paramStateGame).set({
                    messages: allMessges,
                    stateGame: paramStateGame

                })
        }
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
            if (data !== null) {
                //TODO: retorna algo
                console.log(data);
            }
        }).catch(error => {
            console.log(error);
        });
    }

}

GameService.publicName = 'GameService';

export default GameService;