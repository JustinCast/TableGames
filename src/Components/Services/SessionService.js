import { Service } from 'react-services-injector';
import { GraphQLClient } from "../../index";
import gql from "graphql-tag";
class SessionService extends Service {

  addUser(session){
    let userList=[];

    let creatorUser = {
      name: session.users[0].name,
      email: session.users[0].email,
      wonGames: session.users[0].wonGames,
      lostGames: session.users[0].lostGames,
      tiedGames: session.users[0].tiedGames,
      uid: session.users[0].uid
    }

    let actualUser = {
      name: JSON.parse(localStorage.getItem('actualUser')).name,
      email: JSON.parse(localStorage.getItem('actualUser')).email,
      wonGames: JSON.parse(localStorage.getItem('actualUser')).wonGames,
      lostGames: JSON.parse(localStorage.getItem('actualUser')).lostGames,
      tiedGames: JSON.parse(localStorage.getItem('actualUser')).tiedGames,
      uid: JSON.parse(localStorage.getItem('actualUser')).uid
    }
    
    userList.push(creatorUser);
    userList.push(actualUser);

    GraphQLClient.mutate({
      variables: {
        input: {
          users: userList,
          sid: session.sid, // TODO: get uid of Actual User
          game: session.game,
          difficulty: session.difficulty,
          isMachine: session.isMachine,
          name: session.name,
          gameSize: session.gameSize,
          stateGameId: session.stateGameId
        }
      },
      mutation: gql`
          mutation saveSession($input: SessionInputType!) {
            saveSession(input: $input) {
              stateGameId
            }
          }
        `
    }).then(data => {
      localStorage.setItem('stateGameId', JSON.stringify(data.data.saveSession.stateGameId));
    })
      .catch(error => {
        console.log(error);
      });
  }

  createSession(session) {
    let actualUser = {
      name: JSON.parse(localStorage.getItem('actualUser')).name,
      email: JSON.parse(localStorage.getItem('actualUser')).email,
      wonGames: JSON.parse(localStorage.getItem('actualUser')).wonGames,
      lostGames: JSON.parse(localStorage.getItem('actualUser')).lostGames,
      tiedGames: JSON.parse(localStorage.getItem('actualUser')).tiedGames,
      uid: JSON.parse(localStorage.getItem('actualUser')).uid
    }
    let users = [actualUser];
    if (session.isMachine) {
      users.push(null);
    }
    GraphQLClient.mutate({
      variables: {
        input: {
          users: users, //TODO: get Actual Use,
          sid: "", // TODO: get uid of Actual User
          game: session.game,
          difficulty: session.difficulty,
          isMachine: session.isMachine,
          name: session.name,
          gameSize: session.gameSize
        }
      },
      mutation: gql`
          mutation saveSession($input: SessionInputType!) {
            saveSession(input: $input) {
              stateGameId
            }
          }
        `
    }).then(data => {
      localStorage.setItem('stateGameId', JSON.stringify(data.data.saveSession.stateGameId));
    })
      .catch(error => {
        console.log(error);
      });
  }
}


SessionService.publicName = 'SessionService';


export default SessionService;