import express from 'express'; // Import express 
import bodyParser from 'body-parser'; // Import body-parser
import mongoose from 'mongoose'; // Import mongoose
import cors from 'cors'; // Import cors

import postRouter from './routes/posts.js'; // Import router for the posts function in posts.js



// Creating express router
const app = express();

// We know that postRouter has a router that sends the given response to all the '/' files,
// what we want is to send the generic response to '/posts' so we add a prefix '/posts' 
// here in the function;
app.use('/posts', postRouter);

// Using body-parser to parse json with a limit of 30mb of file transfer
app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));
app.use(cors());


// variable to store the url of the MongoDB database
const CONNECTION_URL = 'mongodb+srv://Kingsman27:databasemongo@cluster0.fzjqosh.mongodb.net/?retryWrites=true&w=majority';

// to store the current port, we have used two values
// one is the current port number of the running process.
// if that doesnt do good, we will use port 3000
const PORT = process.env.PORT || 5000;

// using mongoose to connect to the mongoDB database at the provided URL.
// it returns a promise haha.

// What is useNewUrlParser and useUnifiedTopology
// Good practice to add them -- reduces error.

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server listening on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// Again the parameters are to just minify the warnings. Not including them does no harm.
