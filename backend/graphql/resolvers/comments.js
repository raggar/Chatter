const { UserInputError, AuthenticationError } = require('apollo-server');

const checkAuth = require('../../util/checkAuth');
const Post = require('../../models/Post');

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty',
          },
        });
      }

      const post = await Post.findById(postId);

      // if post exists then add a comment to comments array using unshift
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      }
      throw new UserInputError('Post not found');
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        // contains index of post we wish to delete
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        }
        throw new AuthenticationError(
          'Only user who created comment can delete it'
        );
      } else {
        throw new UserInputError('Post not found');
      }
    },
  },
};
