// Define the query and mutation functionality to work w/ the mongoose models
// Hint: Use the functionality in the user-controller.js as a guide.
import { User } from '../models';
import { signToken } from '../utils/auth';
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async () => {

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
    }
  }
}