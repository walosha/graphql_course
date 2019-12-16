import { GraphQLServer } from "graphql-yoga";

// 5 scalar types in grapghQL:  Bolean Int Float ID String

//Users DataBase

const Users = [
  { id: 1, name: "Olawale", email: "walosha@yahoo.com", age: 31 },
  { id: 2, name: "dammy", email: "dammy@yahoo.com", age: 27, class: "masters" },
  { id: 3, name: "shigo", email: "remi@gamil.com" }
];

//Posts DataBase

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
    id: 3,
    title: "Holy Bible",
    body: "The of God,creation and Jesus Christ",
    isPublished: true,
    author: 2
  }
];

//Comments DataBase

const Comments = [
  { id: 1000, text: "i love this inspirational book", author: 3, post: 3 },
  { id: 1001, text: "A message from the God Almight", author: 2, post: 3 },
  { id: 1003, text: "The book is vey simplifyed version", author: 2, post: 2 },
  { id: 1005, text: "I love reading chinua Achebe books!", author: 1, post: 1 }
];

// Type defination schema

const typeDefs = `
type Query {
    Users(query:String): [User!]!
    Posts(query:String): [Post!]!
    Comments(query:Int):[Comment!]!
    me: User!
    post : Post!
    
   
}

type Comment {
  id:ID!
  text:String!
  author: User!
  post:Post!
}

type User {
    id: Int!
    name: String!
    email: String!
    age: Int
    class:String
    posts:[Post!]!
    comments:[Comment!]!
}

type Post {
    id: ID!
    title: String!
    body: String!
    isPublished: Boolean!
    author:User!
    comments:[Comment!]!
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
    Comments(parents, args, ctx, info) {
      if (!args.query) return Comments;

      return Comments.filter(Comment => Comment.author === args.query);
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
    },
    comments(parent, args, ctx, info) {
      return Comments.filter(comment => comment.post === parent.id);
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return Users.find(user => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return Posts.find(post => post.id === parent.post);
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return Posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return Comments.filter(comment => comment.post === parent.id);
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log(" the server has started on port 4000"));
