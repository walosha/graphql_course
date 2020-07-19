import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466/",
  secret: "my-super-secret-secret",
});

prisma.mutation
  .createUser(
    {
      data: {
        name: "Whoopi Afuye",
        email: "whoopi@yahoo.com",
      },
    },
    "{ id name email}"
  )
  .then((user) =>
    console.log(JSON.stringify(user, undefined, 4))
  );

prisma.mutation
  .createPost(
    {
      data: {
        title: "Computer science subject",
        body:
          "The country was thrown into mourning on Tuesday when the Nigerian Air Force first announced that the country’s first female combat helicopter pilot died from a road traffic accident at the NAF base in Kaduna State.",
        published: false,
        user: {
          connect: {
            id: "ckcsbln5e000o08616pc51jvu",
          },
        },
      },
    },
    "{ id title body published}"
  )
  .then((user) =>
    console.log(JSON.stringify(user, undefined, 4))
  );
