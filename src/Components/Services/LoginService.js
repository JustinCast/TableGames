import {Service} from 'react-services-injector';
 
class LoginService extends Service {
    
    get userName(){
        return 'José Pablo Brenes Alfaro';
    }
}

LoginService.publicName = 'LoginService';
 
export default LoginService;