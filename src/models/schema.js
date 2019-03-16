export const typeDefs = `
  type Player {
    name: String!,
    email: String!,
    wonGames: Int!,
    lostGames: Int!,
    tiedGames: Int!,
    uid: String!
  }

  type Session {
    users: Player!,
    index: Int!,
    uid: String!,
    game: String!,
    difficulty: Int!,
    isMachine: Boolean!,
    name: String!,
    gameSize: Int!
  }

  type Query {
    players: [Player]
  }
  type Mutation {
    savePlayer(input: PlayerInputType!): Player
  }

  input PlayerInputType {
    name: String,
    email: String,
    wonGames: Int,
    lostGames: Int,
    tiedGames: Int,
    uid: String
  }
`;
