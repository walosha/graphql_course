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
  updateUser(parent, args, { db: { Users } }, info) {
    const {
      id,
      data: { name, email, age }
    } = args;

    const user = Users.find(user => user.id == id);
    const isEmailTaken = Users.some(user => user.email == email);

    if (!user) return new Error("User not found");
    if (isEmailTaken) return new Error("Email taken by another user");

    if (typeof email === "string") {
      user.email = email;
    }
    if (typeof name === "string") {
      user.name = name;
    }
    if (age !== "undefined") {
      user.age = age;
    }

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

    return deletedUser[0];
  },
  createPost(parent, { data }, { pubsub, db: { Users, Posts } }, info) {
    const { title, body, isPublished, author } = data;
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
    if (isPublished == true) {
      pubsub.publish("post", {
        post: {
          mutation: "CREATED",
          data: post
        }
      });
    }

    return post;
  },
  updatePost(parent, args, { pubsub, db: { Posts } }, info) {
    const {
      id,
      data: { title, body, isPublished }
    } = args;

    const post = Posts.find(post => post.id == id);
    if (!post) return new Error("The post does not Exist");

    const originalPost = Object.assign({}, post); // Use Babel transpiler to use Es6 spread operator!

    if (typeof title === "string") {
      post.title = title;
    }
    if (typeof body === "string") {
      post.body = body;
    }
    if (typeof isPublished === "boolean") {
      post.isPublished = isPublished;
      if (originalPost.isPublished && isPublished) {
        pubsub.publish("post", {
          post: {
            mutation: "UPDATED",
            data: post
          }
        });
      } else if (originalPost.isPublished && !isPublished) {
        pubsub.publish("post", {
          post: {
            mutation: "DELETED",
            data: post
          }
        });
      } else if (!originalPost.isPublished && isPublished) {
        pubsub.publish("post", {
          post: {
            mutation: "CREATED",
            data: post
          }
        });
      }
    }

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
  createComment(parents, args, { pubsub, db: { Users, Comments } }, info) {
    const { text, author, post } = args.data;
    const doesUserExist = Users.some(user => {
      console.log(user.id, author);
      return user.id == author;
    });
    if (!doesUserExist) return new Error("User does not exist!");
    const comment = {
      id: Math.round(Math.random() * 20000),
      text,
      author,
      post
    };

    Comments.push(comment);
    pubsub.publish(`comment ${post}`, {
      comment: {
        mutation: "CREATED",
        data: comment
      }
    });
    return comment;
  },
  updateComment(parent, args, { pubsub, db: { Comments } }, info) {
    const {
      id,
      data: { text, post }
    } = args;

    const comment = Comments.find(comment => comment.id == id);
    if (!comment) return new Error("The comment does not Exist");

    if (typeof text === "string") {
      comment.text = text;
    }
    pubsub.publish(`comment ${post}`, {
      comment: {
        mutation: "UPDATED",
        data: comment
      }
    });
    return comment;
  },
  deleteComment(parent, args, { pubsub, db: { Comments } }, info) {
    const { id } = args;
    const commentIndex = Comments.findIndex(comment => comment.id === id);
    console.log(commentIndex);
    if (commentIndex == -1) throw new Error("The comment does not exist!");
    const [comment] = Comments.splice(commentIndex, 1);
    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: "DELETED",
        data: comment
      }
    });
    return comment;
  }
};

export default Mutation;
