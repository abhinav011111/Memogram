import bcrypt from 'bcryptjs'; // Importing bcrypt to encrypt and decode the user Token.
import jwt from 'jsonwebtoken'; // Importing the library to use JSON web token


// Importing user from the user Schema
import User from '../models/user.js';


// Creating the signin function
export const signin = async(req,res)=> {

    // Taking the email and password from the req body
    const {email, password} = req.body;

    try {

        // We will first find the user which had the particular email
        // Using the fact that email id is UNIQUE
        const existingUser = await User.findOne({email});

        // If there is no user with such email, we will ask him to sign up
        if(!existingUser) return res.status(404).json({message: "User doesn't exist. Please SignUp before using our app"});

        // Now if the user exists, we need to match the entered password
        // The password for the user is stored in bcrypted form in our database, 
        // So we will use inbuilt function compare to decode and math the password for the user.
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

        // If the entered password does not match we will prompt INVALID CREDENTIALS
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        // If the user is authorized
        // Then we sign in and create a token for the user.
        const token = jwt.sign({email:existingUser.email,id: existingUser._id},'test', {expiresIn: "1h"});

        // We will send the user with the authorized token
        res.status(200).json({result: existingUser, token});

    } catch (error) {
    
        res.status(500).json({message: 'Something went wrong'});
    }
}


// A Similiar process we will follow for the signup procedure where we will
// just increase the number of checks and store the password in bcrypted form with us.

export const signup = async(req,res)=> {
    const {email, password, confirmPassword, firstName, lastName, phone_number} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({message: "User already exists. "});

        if(password !== confirmPassword) return res.status(400).json({message: "Password do not match"});

        const hashedPassword = await bcrypt.hash(password,12);
        
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`, phone_number : phone_number});

        const token = jwt.sign({email:result.email,id: result._id},'test', {expiresIn: "1h"});

        res.status(200).json({result, token});

    } catch (error) {
        
        res.status(500).json({message: 'Something went wrong'});
    }
}