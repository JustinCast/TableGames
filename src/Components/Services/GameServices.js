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
          object: click
        }
      },
      mutation: gql `
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