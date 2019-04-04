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
    users: [Player!]!,
    sid: Int!,
    game: String!,
    difficulty: Int!,
    isMachine: Boolean!,
    name: String!,
    gameSize: Int!,
    stateGameId: String
  }

  type Query {
    players: [Player],
    sessions:[Session]
  }
  type Mutation {
    savePlayer(input: PlayerInputType!): Player,
    saveSession(input: SessionInputType!): Session
  }

  input SessionInputType{
    users: [Player],
    sid: Int,
    game: String,
    difficulty: Int,
    isMachine: Boolean,
    name: String,
    sizeGame: Int
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
