import { Service } from 'react-services-injector';
import { GraphQLClient } from "../../index";
import gql from "graphql-tag";

class RoomService extends Service {

  get getSessions(){
    return this.allSessions;
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
      if (this.allSessions===undefined) {
        this.allSessions = data.data.sessions;
        this.$update();
      }
    }
    );

    return this.allSessions;
  }
}

RoomService.publicName = 'RoomService';

export default RoomService;