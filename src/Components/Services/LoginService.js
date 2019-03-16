import { Service } from "react-services-injector";
import { GraphQLClient } from "../../index";
import gql from "graphql-tag";
class LoginService extends Service {


  // Sent User for after login
  sentUser(user) {
    GraphQLClient.mutate({
      variables: { 
        input: {
        name: user.name ,
        email: user.email,
        wonGames: 0,
        lostGames: 0,
        tiedGames: 0,
        uid: user.uid
      }
      },
      mutation: gql`
        mutation savePlayer($input: PlayerInputType!) {
          savePlayer(input: $input) {
            name
          }
        }
      `
    }).then(data =>{
      if( data!= null ){
        console.log(data);
        //localStorage.setItem('actualUser',JSON.stringify())
      }
    }).catch(error => {
        console.log(error);
      });
  }
}

LoginService.publicName = "LoginService";

export default LoginService;
