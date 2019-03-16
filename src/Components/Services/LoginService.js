import {Service} from 'react-services-injector';
import { GraphQLClient } from "../../index";
import gql from 'graphql-tag';
class LoginService extends Service {
    
    get userName(){
        GraphQLClient.query({ query: gql`{ players { name } }` }).then((data) => console.log(data.data));
        return 'José Pablo Brenes Alfaro';
    }

    sentUser(user){
        console.log(user);
        const sentData = graphql(
          sentInfo,
          {
            options: {
              variables:{
                name: user.name,
                email: user.email,
                wonGames: 0,
                lostGames: 0,
                tiedGames: '0',
                uid: user.uid
              }
            }
          }
        )(LoginService);
    }
}

 
LoginService.publicName = 'LoginService';


export default LoginService;