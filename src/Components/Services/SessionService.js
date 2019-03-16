import {Service} from 'react-services-injector';

class SessionService extends Service {
    
    createSession(session){
      console.log(session);
    }
}

 
SessionService.publicName = 'SessionService';


export default SessionService;