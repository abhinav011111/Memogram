import express from 'express'; // Import express 
import bodyParser from 'body-parser'; // Import body-parser
import mongoose from 'mongoose'; // Import mongoose
import cors from 'cors'; // Import cors


const app = express();

app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));
app.use(cors());


// variable to store the url of the MongoDB database
const CONNECTION_URL = 'mongodb+srv://Kingsman27:Mumam270901@cluster0.fzjqosh.mongodb.net/?retryWrites=true&w=majority';

// to store the current port, we have used two values
// one is the current port number of the running process.
// if that doesnt do good, we will use port 3000
const PORT = process.env.PORT || 3000;

// using mongoose to connect to the mongoDB database at the provided URL.
// it returns a promise haha.

// What is useNewUrlParser and useUnifiedTopology
// Good practice to add them -- reduces error.
mongoose.connect(CONNECTION_URL , {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log('Server running on port: ${PORT}')))
.catch((error) => console.log(error.message));

// Again the parameters are to just minify the warnings. Not including them does no harm.
mongoose.set('useFindAndModify', true);