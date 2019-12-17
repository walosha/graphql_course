const User = {
  posts(parent, args, { db: { Posts } }, info) {
    return Posts.filter(post => post.author === parent.id);
  },
  comments(parent, args, { db: { Comments } }, info) {
    return Comments.filter(comment => comment.post === parent.id);
  }
};

export default User;
