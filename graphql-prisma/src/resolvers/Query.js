const Query = {
  Users(parents, args, { prisma }, info) {
    let opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [
          { name_contains: args.query },
          { email_contains: args.query },
        ],
      };
    }
    return prisma.query.users(opArgs, info);
  },
  Posts(parents, args, { prisma }, info) {
    let opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [
          { title_contains: args.query },
          { body_contains: args.query },
        ],
      };
    }
    return prisma.query.posts(opArgs, info);
  },
  Comments(parents, args, { db: { Comments } }, info) {
    if (!args.query) return Comments;

    return Comments.filter(
      (Comment) => Comment.author === args.query
    );
  },
};

export default Query;
