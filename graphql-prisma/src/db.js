const Users = [
  { id: "1", name: "Olawale", email: "walosha@yahoo.com", age: 31 },
  {
    id: "2",
    name: "dammy",
    email: "dammy@yahoo.com",
    age: 27,
    class: "masters"
  },
  { id: "3", name: "shigo", email: "remi@gamil.com" }
];

//Posts DataBase

const Posts = [
  {
    id: "1",
    title: "there is a country",
    body: "xxxxx",
    isPublished: true,
    author: "1"
  },
  {
    id: "2",
    title: "Javascrript The Definitive Guide",
    body:
      "The whole gist about the javscript language both on the sever and client side",
    isPublished: false,
    author: "1"
  },
  {
    id: "3",
    title: "Holy Bible",
    body: "The of God,creation and Jesus Christ",
    isPublished: true,
    author: "2"
  }
];

//Comments DataBase

const Comments = [
  {
    id: "1000",
    text: "i love this inspirational book",
    author: "3",
    post: "3"
  },
  {
    id: "1001",
    text: "A message from the God Almight",
    author: "2",
    post: "3"
  },
  {
    id: "1003",
    text: "The book is vey simplifyed version",
    author: "2",
    post: "2"
  },
  {
    id: "1005",
    text: "I love reading chinua Achebe books!",
    author: "1",
    post: "1"
  }
];

const db = { Users, Comments, Posts };

export default db;
