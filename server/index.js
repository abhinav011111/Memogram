import express from 'express'; // Import express 
import bodyParser from 'body-parser'; // Import body-parser
import mongoose from 'mongoose'; // Import mongoose
import cors from 'cors'; // Import cors


const app = express();

app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));
app.use(cors());