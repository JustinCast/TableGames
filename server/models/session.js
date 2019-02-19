const { GraphQLList, GraphQLObjectType, GraphQLInt } = require("graphql");

const session = new GraphQLObjectType({
  name: "session",
  fields: () => ({
    users: { type: GraphQLList },
    index: { type: GraphQLInt }
  })
});
