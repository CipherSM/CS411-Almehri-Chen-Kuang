//npm install mongoose beforehand
import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://almehri:CS411AhmedShangimKelvin@projectmongodb.l0jczwo.mongodb.net/";

// Create a a connection to mongodb with mongoose.connect 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We're connected to the database.");
  });
const data = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
  
})