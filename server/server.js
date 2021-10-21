const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
//require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const app = express();
const PORT = process.env.PORT || 3001;

const startApollo = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  })

  // Apollo 3.0 Testing
  // server.start().then(res => {
  //   server.applyMiddleware({ app });
  //   app.listen({ port: `${PORT}` }, () =>
  //     console.log(`API server running on port ${PORT}!`),
  //     console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
  //   )
  // });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};
startApollo();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`🌍 Now listening on localhost:${PORT}`)
//   });

//   db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully"); });

// const mongoose = require('mongoose');

// mongoose.connect(process.env.ATLAS_URI, 
//   {
//   auth: {
//     user: process.env.ATLAS_USER,
//     password: process.env.ATLAS_PWD
//   }, 
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

// const db = mongoose.connection;

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`)
  });
});