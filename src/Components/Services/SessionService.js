import {Service} from 'react-services-injector';
import { GraphQLClient } from "../../index";
import gql from "graphql-tag";
class SessionService extends Service {
    
    createSession(session){
      console.log(session);
      GraphQLClient.mutate({
        variables: { 
          input: {
            users: [{}], //TODO: get Actual User
            index: 0,
            uid: 0, // TODO: get uid of Actual User
            game: session.game,
            difficulty: session.difficulty,
            isMachine: session.isMachine,
            name: session.name,
            sizeGame: session.sizeGame
          }
        },
        mutation: gql`
          mutation saveSession($input: SessionInputType!) {
            saveSession(input: $input) {
              user,
              game,
              difficulty,
              isMachine,
              name,
              sizeGame
            }
          }
        `
      }).then(data =>{
        if( data!= null ){
          console.log(data);
        }
      }).catch(error => {
          console.log(error);
        });
    }
}

 
SessionService.publicName = 'SessionService';


export default SessionService;