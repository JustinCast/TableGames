const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchema
} = require("graphql");
import player from "./player";

const session = new GraphQLObjectType({
  name: "session",
  fields: () => ({
    users: { type: [player] },
    index: { type: GraphQLInt },
    uid: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    sessions: {
      type: new GraphQLList(session),
      /**
       * TODO: implementar
       */
      resolve() {}
    },
    session: {
      type: session,
      args: {
        uid: GraphQLString
      },
      /**
       * TODO: implementar
       * @param {*} parent
       * @param {*} args
       */
      resolve(parent, args) {}
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    saveSession: {
      type: session,
      args: {
        users: { type: GraphQLList },
        index: { type: new GraphQLNonNull(GraphQLInt) },
        uid: { type: new GraphQLNonNull(GraphQLString) }
      },
      /**
       * TODO: implementar
       * @param {*} parentValue 
       * @param {*} args 
       */
      resolve(parentValue, args) {}
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
});
