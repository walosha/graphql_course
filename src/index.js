import { GraphQLServer } from "graphql-yoga";

// 5 scalar types in grapghQL:  Bolean Int Float ID String
// Type defination schema

//Users DataBase

const Users = [
  { id: 1, name: "Olawale", email: "walosha@yahoo.com", age: 31 },
  { id: 2, name: "dammy", email: "dammy@yahoo.com", age: 27, class: "masters" },
  { id: 3, name: "shigo", email: "remi@gamil.com" }
];

const Posts = [
  {
    id: 1,
    title: "there is a country",
    body: "xxxxx",
    isPublished: true,
    author: 1
  },
  {
    id: 2,
    title: "Javascrript The Definitive Guide",
    body:
      "The whole gist about the javscript language both on the sever and client side",
    isPublished: false,
    author: 1
  },
  {
    id: 2,
    title: "Holy Bible",
    body: "The of God,creation and Jesus Christ",
    isPublished: true,
    author: 2
  }
];

const typeDefs = `
type Query {
    Users(query:String): [User!]!
    Posts(query:String): [Post!]!
    me: User!
    post : Post!
   
}
type User {
    name: String!
    email: String!
    age: Int
    class:String
}

type Post {
    id: ID!
    title: String!
    body: String!
    isPublished: Boolean!
    author:User!
}`;

//Resolvers

const resolvers = {
  Query: {
    Users(parents, args, ctx, info) {
      if (!args.query) return Users;
      return Users.filter(user =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    Posts(parents, args, ctx, info) {
      if (!args.query) return Posts;
      return Posts.filter(
        post =>
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    me() {
      return {
        name: "Olawale Afuye",
        email: "walosha@yahoo.com",
        age: 31
      };
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return Users.find(user => user.id === parent.author);
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log(" the server has started on port 4000"));
