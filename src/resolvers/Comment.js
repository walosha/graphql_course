const Comment = {
  author(parent, args, { db: { Users } }, info) {
    return Users.find(user => user.id === parent.author);
  },
  post(parent, args, { db: { Posts } }, info) {
    console.log(Posts);
    return Posts.find(post => post.id === parent.post);
  }
};

export default Comment;
