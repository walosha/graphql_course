const Mutation = {
  createUser(parent, args, { db: { Users } }, info) {
    const { name, email, age } = args.data;
    const isEmailAvail = Users.some(user => user.email === email);
    if (isEmailAvail) return new Error("The Email is available");
    const user = {
      id: Math.round(Math.random() * 20000),
      name,
      email,
      age
    };

    Users.push(user);
    return user;
  },
  deleteUser(parent, args, { db: { Users, Posts, Comments } }, info) {
    const { id } = args;
    const userIndex = Users.findIndex(user => user.id == id);

    if (userIndex === -1) return new Error("User does not exist !");

    const deletedUser = Users.splice(userIndex, 1);

    Posts = Posts.filter(post => {
      const match = post.author == id;

      if (match) {
        Comments = Comments.filter(comment => comment.post !== post.id);
      }

      return !match;
    });

    Comments = Comments.filter(comment => comment.author !== id);

    // console.log(Comments);
    // console.log("---------------------------------");
    console.log(Posts);
    // console.log("-----------------------------------");
    // console.log(Users);

    return deletedUser[0];
  },
  createPost(parent, args, { db: { Users, Posts } }, info) {
    const { title, body, isPublished, author } = args.data;
    const doesUserExist = Users.some(user => user.id === author);
    if (!doesUserExist) return new Error("User does not exist!");
    const post = {
      id: Math.round(Math.random() * 20000),
      title,
      body,
      isPublished,
      author
    };

    Posts.push(post);
    return post;
  },
  deletePost(parent, args, { db: { Posts, Comments } }, info) {
    const { id } = args;
    const postIndex = Posts.findIndex(post => post.id == id);
    if (postIndex === -1) throw new Error("The post does not exist!");
    const deletePost = Posts.splice(postIndex, 1);
    Comments = Comments.filter(comment => comment.post != id);
    return deletePost[0];
  },
  createComment(parents, args, { db: { Users, Comments } }, info) {
    const { text, author, post } = args.data;
    const doesUserExist = Users.some(user => user.id === author);
    if (!doesUserExist) return new Error("User does not exist!");
    const comment = {
      id: Math.round(Math.random() * 20000),
      text,
      author,
      post
    };

    Comments.push(comment);
    return comment;
  },
  deleteComment(parent, args, { db: { Comments } }, info) {
    const { id } = args;
    const commentIndex = Comments.findIndex(comment => comment.id == id);
    console.log(Comments);
    if (commentIndex == -1) throw new Error("The comment does not exist!");

    return Comments.splice(commentIndex, 1)[0];
  }
};

export default Mutation;
