import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import Comment from "./resolvers/Comment";
import Mutation from "./resolvers/Mutation";
import Post from "./resolvers/Post";
import Subscription from "./resolvers/Subscription";
import Query from "./resolvers/Query";
import User from "./resolvers/User";
import "./prisma";
const pubsub = new PubSub();

//Resolvers
const resolvers = {
  Query,
  Mutation,
  Subscription,
  Post,
  Comment,
  User,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db,
    pubsub,
  },
});

server.start(() =>
  console.log(" the server has started on port 4000")
);
