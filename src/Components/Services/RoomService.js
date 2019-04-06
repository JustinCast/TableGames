import { Service } from 'react-services-injector';
import { GraphQLClient } from "../../index";
import gql from "graphql-tag";
import { List } from '@material-ui/core';

class RoomService extends Service {

  constructor(){
    super();
    this.allSessions=[];
  }


  get sessions() {
    GraphQLClient.query({
      query: gql`
          {
            sessions {
              users{
                name,
                email,
                lostGames,
                tiedGames,
                wonGames,
                uid
              },
              sid,
              game,
              difficulty,
              isMachine,
              name,
              gameSize,
              stateGameId
            }
          }
        `
    }).then(data => {
      console.log();
      if (this.allSessions.length === 0 && data.data.sessions.length> 0) {
        this.allSessions = data.data.sessions;
        console.log("Se asignó correctamente");
        this.$update();
      }
    }
    );
    return this.allSessions;
  }

}

RoomService.publicName = 'RoomService';

export default RoomService;