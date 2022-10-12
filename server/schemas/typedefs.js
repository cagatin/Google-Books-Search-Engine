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