const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');

const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../util/validators');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }, context) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Login Errors', { errors });
      }

      const user = await User.findOne({ username });

      // if no user exists in database with specified username
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }
      const token = generateToken(user);
      context.req.headers.authorization = `Bearer ${token}`;

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    // args will be "RegisterInput" which contains the fields we described earlier
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword }, context }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }

      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);
      context.req.headers.authorization = `Bearer ${token}`;

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
