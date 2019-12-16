import { GraphQLServer } from "graphql-yoga";

// Type defination schema

const typeDefs = `
type Query {
    hello: String!,
    name: String!
    location: String!
    bio: String!
}`;

//Resolvers

const resolvers = {
  Query: {
    hello() {
      return "This is my first GrapghQL app";
    },
    name() {
      return "I am Damilola Adesun ";
    },
    location() {
      return "Ori-Okuta, Lagos ";
    },
    bio() {
      return "I am Front-End web developer with percific professional service! ";
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log(" the server has started on port 4000"));
