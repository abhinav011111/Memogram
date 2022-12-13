// import mongoose from 'mongoose';
// import PostMessage from "../models/postMessage.js";

// // Get posts
// export const getPosts = async (req, res) => {

//     // Here we have used async-await function
//     // try block is initiated when there is no error
//     // catch is used for error
//     try {
        
//         // We use await and is use find() function to return an array of all the posts;
//         const postMessages = await PostMessage.find();
//         /*
//             Response
//                 status code : 200
//                 body : array of all posts
//         */
//         res.status(200).json(postMessages);
//     } catch (error) {
//         /*
//             Response
//                 status code : 404
//                 body : error message
//         */
//         res.status(404).json({ mesage: error.message });
//     }
// };


// // To create a new post
// export const createPost = async (req, res) => {


//     /*
//         What does the req contains?
//         It contains all the required information to create a database object as defined in the schema.
        
//         creator, likeCount, title....
//     */

//     // contains the req body....

//     // Paramters
//     const post = req.body;
//     // creating a new post
//     const newPostMessage = new PostMessage({...post, creator: req.userId, createdAt : new Date().toISOString()});


//     try {

//         // save it haha.
//         await newPost.save();
//         res.status(201).json(newPostMessage);
//     } catch (error) {
//         /*
//             Response
//                 status code : 409
//                 body : error message
//         */
//        console.log(error.message);
//         res.status(409).json({ mesage: error.message });
//     }
// };

// export const updatePost = async (req, res) => {

//     // finding the id of the post to be changed
//     const { id } = req.params;
//     const { title, message, creator , selectedFile, tags } = req.body;
    
//     // Here we actually check whether the given id is a valid one or not.
//     // We will use validator of the mongoose.
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const updatedPost = { title, message, creator, tags, selectedFile, _id: id };

//     // We will wait for the new post using the find findByIdAndUpdate function
//     await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//     res.json(updatedPost);
// }

// export const deletePost = async (req, res) => {

//     // finding the id of the post to be changed
//     const { id } = req.params;
   
    
//     // Here we actually check whether the given id is a valid one or not.
//     // We will use validator of the mongoose.
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    

//     // We will wait for the new post using the find findByIdAndUpdate function
//     await PostMessage.findByIdAndRemove(id);

//     console.log("Deleted");
// }

// export const likePost = async (req, res) => {

//     // finding the id of the post to be changed
//     const { id } = req.params;
    
//     if(!req.userId)
//     return res.json({message: 'Unauthenticated'});  //we have the access to user id from auth . Auth has generated the user id

//     // Here we actually check whether the given id is a valid one or not.
//     // We will use validator of the mongoose.
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const post= await PostMessage.findById(id);

//     const index = post.likes.findIndex((id) => id === String(req.userId));
//     // post.likes is an array containing the list of id of the user that liked the post
//     if(index ===-1){
//         post.likes.push(req.userId); // if the current user has not liked post till now we will add the user to list
//     }
//     else{
//         post.likes = post.likes.filter((id)=> id!== String(req.userId));    
//         // if the user has already liked the post e will remove that user from the list                         
//     }
//     // We will wait for the new post using the find findByIdAndUpdate function
//     const updatedPost= await PostMessage.findByIdAndUpdate(id,post,{new:true})

//     res.json(updatedPost);
// }

import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}


export default router;