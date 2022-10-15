// Define the query and mutation functionality to work w/ the mongoose models
// Hint: Use the functionality in the user-controller.js as a guide.
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Error: Must be logged in');
    }
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      // Find a user based on the Email
      const userData = await User.findOne({ email });

      // If no user matches the email, throw an Authentication Error
      if (!userData) {
        throw new AuthenticationError("No User found that matches the email");
      }

      // Use the isCorrectPassword method of the User model to verify the password
      const passwordCheck = userData.isCorrectPassword(password);

      // Check if the password used is correct
      if (!passwordCheck) {
        throw new AuthenticationError(`Incorrect Password for ${email}!`);
      }

      // If the password matches the email, sign the token
      const token = signToken(userData);

      // return the User and the token
      return { token, profile }
    },

    addUser: async (parent, { username, email, password }) => {
      // Create the user
      const newUser = await User.create({ username, email, password });

      // Then sign the token
      const token = signToken(newUser);

      return { token, newUser };
    },

    saveBook: async (parent, { data }, context) => {
      // If the user is logged in, save the book into the Author's book array.
      if (context.user) {
        // Create the Book
        const newBook = Book.create(data);

        // Update the User's saved books array
        const userData = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: newBook } },
          { new: true }
        );

        return userData;
      } else {
        throw new AuthenticationError("You must be logged in to save a book!");
      }
    },

    removeBook: async (parent, { bookId }) => {
      // Check if the user is logged in
      if (context.user) {
        const userData = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        return userData;
      } else {
        throw new AuthenticationError('Must be logged in to remove a book!');
      }
    }
  }
}

module.exports = resolvers;