/* TODO: Define the neecessary Query and Mutation types
 * 
 * Query type:
 *      - me: returns User type
 * 
 * Mutation Types:
 *      - login: accepts email/password as parameters, returns Auth type
 *      - addUser: accepts username, email, password as parameters, returns Auth type
 *      - saveBook: accepts a book author's array, desc, title, bookId, image, and link as parameters.
 *                  returns a User type (look into creating an input type to handle all of these parameters).
 *      - removeBook: accepts a book's bookID as a parameter, returns a User type.
 * 
 * User type:
 *      - _id
 *      - username
 *      - email
 *      - bookCount
 *      - savedBooks (array of Book types)
 * 
 * Book type:
 *      - bookId (NOT _id, but the id value returned from Google's book API).
 *      - authors (array of strings, as there may be more than one author)
 *      - description
 *      - title
 *      - image
 *      - link
 * 
 * Auth type
 *      - token
 *      - user (References the User type)
 */
import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]

    }
    
    type Book {
        bookId: String
        authors: [String!]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String!], description: String!, title: String!, bookId: String!, image: String!, link: String!): User
        removeBook(bookId: String!): User
    }

`