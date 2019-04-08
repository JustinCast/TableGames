import {
    Service
} from 'react-services-injector';
import {
    GraphQLClient
} from "../../index";
import gql from "graphql-tag";

import firebaseApp from '../Services/FirebaseService';

class GameService extends Service {

    sendMessage(text){
        console.log(JSON.parse(localStorage.getItem('actualUser')).name+ text);
    }

    get messages(){
        return new Promise(resolve=>{
            resolve([{name:"luis",text:"lk jshkfa akjhdkjfa kjhasjkfh jkas fj akjshfkjhasjkh asdfjhkas kjhdsfjha kj kjhaskjf jkhkjasdfh jhasdfjkh jbasfkjbajksbgkjag"},{name:"pepe",text:"hola"},{name:"luis",text:"que?"},{name:"luis",text:"lk jshkfa akjhdkjfa kjhasjkfh jkas fj akjshfkjhasjkh asdfjhkas kjhdsfjha kj kjhaskjf jkhkjasdfh jhasdfjkh jbasfkjbajksbgkjag"},{name:"pepe",text:"hola"},{name:"luis",text:"que?"}])
        })
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