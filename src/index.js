import { GraphQLServer } from "graphql-yoga";

// 5 scalar types in grapghQL:  Bolean Int Float ID String
// Type defination schema

const typeDefs = `
type Query {
    add(numbers:[Int!]):Int
    greeting(name:String):String!
    me: User!
    post : POST!
    grades:[Int!]!
}
type User {
    name: String!
    email: String!
    age: Int
    class:String
}

type POST {
    id: ID!
    title: String!
    body: String!
    isPublished: Boolean!
}`;

//Resolvers

const resolvers = {
  Query: {
    greeting(parents, args, ctx, info) {
      if (!args.name) return "please Insert name";
      return `My name is ${args.name}`;
    },
    add(parents, args, ctx, info) {
      if (args.numbers.length === 0) return 0;
      return args.numbers.reduce((acc, cur) => acc + cur, 0);
    },
    me() {
      return {
        name: "Olawale Afuye",
        email: "walosha@yahoo.com",
        age: 31
      };
    },
    grades() {
      return [70, 34, 67, 45, 90, 50];
    },
    post() {
      return {
        id: "andbdh872727",
        title: "The programing language in 2019?",
        body: "Error: Query.User defined in resolvers,To be continued later!",
        isPublished: true
      };
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log(" the server has started on port 4000"));
