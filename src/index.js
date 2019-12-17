import { GraphQLServer } from "graphql-yoga";
import db from "./db";
import Comment from "./resolvers/Comment";
import Mutation from "./resolvers/Mutation";
import Post from "./resolvers/Post";
import Query from "./resolvers/Query";
import User from "./resolvers/User";

//Resolvers
const resolvers = {
  Query,
  Mutation,
  Post,
  Comment,
  User
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db
  }
});

server.start(() => console.log(" the server has started on port 4000"));
