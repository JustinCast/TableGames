import {Service} from 'react-services-injector';
import { GraphQLClient } from "../../index";
import gql from "graphql-tag";
class SessionService extends Service {
    
    createSession(session){
      console.log(session);
    }
}

 
SessionService.publicName = 'SessionService';


export default SessionService;