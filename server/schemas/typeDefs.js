// const { gql } = require('apollo-server-express');

// const typeDefs = gql`
//   type User {
//     _id: ID
//     email: String
//     username: String
//     bookCount: Int
//     savedBooks: [Book]
//   }
//     type Book {
//       type Book {
//         bookId: String
//         description: String
//         authors: [String]
//         title: String
//         image: String
//         link: String   
//     }
//     input SavedBookInput {
//       bookId: String
//       description: String
//       authors: [String]
//       title: String
//       image: String
//       link: String
//   }
//     type Auth {
//       token: ID!
//       user: User
//   }
//     type Query {
//       me: User
//   }
//   type Mutation {
//     login(email: String!, password: String!): Auth
//     addUser(username: String!, email: String!, password: String!): Auth
//     saveBook(book: SavedBookInput!): User
//     removeBook(bookId: String!): User
//   }
// `;

// module.exports = typeDefs;


const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String   
    }
    type Query {
        me: User
    }
    type Auth {
        token: ID!
        user: User
    }
    input SavedBookInput {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: SavedBookInput!): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;
