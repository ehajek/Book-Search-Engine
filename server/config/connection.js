const mongoose = require('mongoose');
//require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googleBook2',
  // process.env.ATLAS_URI, 
  // auth: {
  //   user: process.env.ATLAS_USER,
  //   password: process.env.ATLAS_PWD
  // }, 
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://test-DB-BootCamp:<password>@cluster0.oovn4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
