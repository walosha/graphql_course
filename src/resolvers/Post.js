const Post = {
  author(parent, args, { db: { Users } }, info) {
    return Users.find(user => user.id === parent.author);
  },
  comments(parent, args, { db: { Comments } }, info) {
    return Comments.filter(comment => comment.post === parent.id);
  }
};
export default Post;
