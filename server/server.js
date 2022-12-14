const express = require('express');
const path = require('path');
const db = require('./config/connection');

// Import the apollo server 
const { ApolloServer } = require('apollo-server-express');
// Import Middlewear Authorization
const { authMiddleware } = require('./utils/auth');
// Import the typeDefs and resovlers
const { typeDefs, resolvers } = require('./schemas')

const app = express();
const PORT = process.env.PORT || 3001;

// Create an Instance of the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo Server w/ the GQL schema
// Implement apollo server and apply it to the express server as middleware
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    console.log(`Use GraphQ: at https://localhost:${PORT}${server.graphqlPath}`);
  });
};

// call the async function to start the sever
startApolloServer(typeDefs, resolvers);
