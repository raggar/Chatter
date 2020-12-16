// this file combines the logic of each resolver

const postsResolvers = require('./posts');
const userResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
  // any query or mutation that returns a "post" will go through this modifier and add these properties
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
