import { Service } from 'react-services-injector';
import { GraphQLClient } from "../../index";
import gql from "graphql-tag";

class RoomService extends Service {
  constructor() {
    super();
    this.allSessions = [];
  }

  get sessions() {
    GraphQLClient.query({
      query: gql`
          {
            sessions {
              users{
                name
              },
              sid,
              game,
              difficulty,
              isMachine,
              name,
              gameSize
            }
          }
        `
    }).then(data => {
      if (this.allSessions.length === 0) {
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