const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id});
                return userData;
            }
            throw new AuthenticationError('Whoops! Wrong User');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const newUser = await User.create(args);
            const token = signToken(newUser);
            return { token, newUser }
        },
        loginUser: async (parent, args) => {
            const { email, password } = args;
            const userLogin = user.findOne({ email });
            if ( !userLogin ) {
                throw new AuthenticationError('Whoops! Wrong Login');
            } else {
                const correctPw = await userLogin.isCorrectPassword(password);
                if (!correctPw) {
                    throw new AuthenticationError('Whoops! Wrong Password');                    
                } else {
                    const token = signedToken(userLogin);
                    return {
                        token, userLogin
                    }
                }
            }
        },
        addBook: async (parent, args, context) => {
            if (context.user) {
                const favBook = await User.findByIdAndUpdate({ _id: context.user._id}, {$push: {savedBooks: args}}, {new: true});
                return favBook 
            } else {
                throw new AuthenticationError('Whoops! Cant add book');
            }
        },
        deleteBook: async (parent, args, context) => {
            if (context.user) {
                const favBook = await User.findByIdAndUpdate({ _id: context.user._id}, {$pull: {savedBooks: bookId}}, {new: true});
                return favBook 
            } else {
                throw new AuthenticationError('Whoops! This will always be a favorite');
            }
    }
}