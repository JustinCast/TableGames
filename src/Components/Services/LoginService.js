import { Service } from "react-services-injector";
import { GraphQLClient } from "../../index";
import gql from "graphql-tag";
class LoginService extends Service {
  constructor() {
    super();
 
    this.player = {};
  }

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
            email
            name,
            wonGames,
            lostGames,
            uid,
            tiedGames
          }
        }
      `
    }).then(data =>{
      if( data!= null ){
        this.player = data.data.savePlayer;
        localStorage.setItem('actualUser',JSON.stringify(data.data.savePlayer))
        this.$update();
      }
    }).catch(error => {
        console.log(error);
      });
  }
}

LoginService.publicName = "LoginService";

export default LoginService;
