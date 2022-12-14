import mongoose from 'mongoose'; // Importing mongoDB crawler

// Creating schema
const userSchema = mongoose.Schema({
   name: {type:String, required: true},
   email: {type: String, required: true},
   password: {type: String, required: true},
   id: {type: String},
 });

 export default mongoose.model("User", userSchema);