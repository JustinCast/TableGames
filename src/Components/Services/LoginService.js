import { Service } from "react-services-injector";
import { GraphQLClient } from "../../index";
import gql from "graphql-tag";
class LoginService extends Service {
  get userName() {
    GraphQLClient.query({
      query: gql`
        {
          players {
            name
          }
        }
      `
    }).then(data => console.log(data.data));
    return "José Pablo Brenes Alfaro";
  }

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
    })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
    console.log(user);
  }
}

LoginService.publicName = "LoginService";

export default LoginService;
