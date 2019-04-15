import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLNonNull
  } from "graphql";
  
  const MessageType = new GraphQLObjectType({
    name: "MessageType",
    description: "TableGames Message type definition",
    fields: () => ({
      name: { type: GraphQLString },
      message: { type: GraphQLString },
    })
  });
  
  const MessageInputType = new GraphQLInputObjectType({
    name: "MessageInputType",
    description: "Message type input definition",
    fields: () => ({
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      message: {
        type: new GraphQLNonNull(GraphQLString)
      }
    })
  });
  
  export {
    MessageType,
    MessageInputType
  }
  