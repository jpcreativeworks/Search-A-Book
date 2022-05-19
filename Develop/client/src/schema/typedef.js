const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        profile: User
    }

    type Book {        
        authors: [String]
        description: String
        bookId: ID
        image: String
        link: String
        title: String        
    }

    type Q uery {
        me: User
    }

    type Mutation {
        addUser(
            username: String!,
            email: String!,
            password: String!
        ): Auth
        loginUser(
            email: String!,
            password: String!
        ): Auth
        addBook(
            bookId: ID,
            authors: [String],
            description: String,
            image: String,
            link: String,
            title: String             
        ): User
        removeBook(
            bookId: ID!
        ): User
        
    }
`
module.exports = typeDefs;