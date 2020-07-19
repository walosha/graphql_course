const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db: { Posts }, pubsub }, info) {
      const post = Posts.find(post => post.id === postId);

      if (!post) throw new Error("The post does not exist!");

      return pubsub.asyncIterator(`comment ${postId}`);
    }
  },
  post: {
    subscribe(parents, args, { pubsub }, info) {
      return pubsub.asyncIterator("post");
    }
  }
};

export default Subscription;
