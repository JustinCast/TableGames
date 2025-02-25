import {
    Service
} from 'react-services-injector';
import {
    GraphQLClient
} from "../../index";
import gql from "graphql-tag";
import firebaseApp from '../Services/FirebaseService';

class GameService extends Service {

    resetData(stateGame) {

        firebaseApp.firebase_
            .firestore().collection("messages").doc(stateGame).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        firebaseApp.firebase_
            .firestore().collection("stateGame").doc(stateGame).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
            const sessionRef =firebaseApp.firebase_
            .firestore()
            .collection("session")
            .where("stateGameId", "==", stateGame);
          sessionRef.get().then(docSnapshot => {
            this.deleteSession(docSnapshot.docs[0].id);
          })
          
          
        
    }

    deleteSession(id){
        //console.log("Id: "+id);
        firebaseApp.firebase_
            .firestore().collection("session").doc(id).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }

    sendMessage(text, paramStateGame, messages) {
        if (text !== "") {
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