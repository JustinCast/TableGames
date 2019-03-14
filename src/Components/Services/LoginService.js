import {Service} from 'react-services-injector';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const sentInfo = gql`
  mutation savePlayer($name: String!,$email: String!,$wonGames: String!,$lostGames: Int!,$tiedGames: String!, $uid: String!) {
    savePlayer(name: $name,email: $email,wonGames: $wonGames,lostGames: $lostGames,tiedGames: $tiedGames,uid: $uid) {
      name
    }
  }
`;


class LoginService extends Service {
    
    get userName(){
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