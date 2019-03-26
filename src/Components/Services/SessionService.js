import {Service} from 'react-services-injector';
import { GraphQLClient } from "../../index";
import gql from "graphql-tag";
class SessionService extends Service {
    
    createSession(session){
      let actualUser = {
        name: JSON.parse(localStorage.getItem('actualUser')).name,
        email: JSON.parse(localStorage.getItem('actualUser')).email,
        wonGames: JSON.parse(localStorage.getItem('actualUser')).wonGames,
        lostGames: JSON.parse(localStorage.getItem('actualUser')).lostGames,
        tiedGames: JSON.parse(localStorage.getItem('actualUser')).tiedGames,
        uid: JSON.parse(localStorage.getItem('actualUser')).uid
      }
      GraphQLClient.mutate({
        variables: { 
          input: {
            users: [actualUser], //TODO: get Actual Use,,
            index: 0,
            sid: actualUser.uid, // TODO: get uid of Actual User
            game: session.game,
            difficulty: session.difficulty,
            isMachine: session.isMachine,
            name: session.name,
            gameSize: session.gameSize
          }
        },
        mutation: gql`
          mutation saveSession($input: SessionInputType!) {
            saveSession(input: $input) {
              stateGameId
            }
          }
        `
      }).then( data =>{
        localStorage.setItem('stateGameId',JSON.stringify(data.data.saveSession.stateGameId));
      })
      .catch(error => {
          console.log(error);
      });
    }
}

 
SessionService.publicName = 'SessionService';


export default SessionService;