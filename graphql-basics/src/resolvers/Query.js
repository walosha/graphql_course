const Query = {
    Users(parents, args, { db: { Users } }, info) {
        if (!args.query) return Users;
        return Users.filter(user =>
            user.name.toLowerCase().includes(args.query.toLowerCase())
        );
    },
    Posts(parents, args, { db: { Posts } }, info) {
        if (!args.query) return Posts;
        return Posts.filter(
            post =>
                post.title.toLowerCase().includes(args.query.toLowerCase()) ||
                post.body.toLowerCase().includes(args.query.toLowerCase())
        );
    },
    Comments(parents, args, { db: { Comments } }, info) {
        if (!args.query) return Comments;

        return Comments.filter(Comment => Comment.author === args.query);
    }
}

export default Query;