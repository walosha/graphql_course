import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466/",
  secret: "my-super-secret-secret",
});

prisma.query
  .users(null, "{ id name email}")
  .then((user) =>
    console.log(JSON.stringify(user, undefined, 4))
  );

prisma.query
  .comments(null, "{ id text}")
  .then((comment) =>
    console.log(JSON.stringify(comment, undefined, 4))
  );
