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
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL , {useNewUrlParser: true, useUnifiedTopology: true});
