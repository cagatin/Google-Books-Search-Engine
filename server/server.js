const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// Import the apollo server 
const { ApolloServer } = require('apollo-server-express');

// Import the typeDefs and resovlers
const { typeDefs, resolvers } = require('./schemas')

const app = express();
const PORT = process.env.PORT || 3001;

// Create an Instance of the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

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

