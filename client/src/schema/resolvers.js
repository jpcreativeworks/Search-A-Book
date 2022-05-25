const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, arg, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id});
                return userData;
            }
            throw new AuthenticationError('Whoops! Wrong User');
        }
    },
    Mutation: {
        addUser: async (parent, arg, context)

    }
}