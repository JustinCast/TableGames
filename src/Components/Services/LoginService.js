import {Service} from 'react-services-injector';
import { GraphQLClient } from "../../index";
import gql from 'graphql-tag';
class LoginService extends Service {
    
    get userName(){
        GraphQLClient.query({ query: gql`{ players { name } }` }).then((data) => console.log(data.data));
        return 'José Pablo Brenes Alfaro';
    }
}

LoginService.publicName = 'LoginService';
 
export default LoginService;