import express from 'express'; // Import express
import mongoose from 'mongoose'; // Importing mongoose crawler

// Importing all the schema for the post-messages.
import PostMessage from '../models/postMessage.js';

const router = express.Router(); 
// creating an express router to route the requests to correct ENDPOINTS



export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    const newtags = tags.split(',');
    

    const newtagArr = newtags.map((tag) => (
        new RegExp(tag, "i")
    ));

    try {
        const title = new RegExp(searchQuery, "i");
        
        

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: newtagArr } } ]});


        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


// Controller to GET request
export const getPosts = async (req, res) => { 
    try {

        // find all the objects with the given Schema
        const postMessages = await PostMessage.find().sort({createdAt:-1});
        
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Controller to GET a post with the required id/params.
export const getPost = async (req, res) => { 


    const { id } = req.params;

    try {

        // Using findById.
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


// Controller for POST request
export const createPost = async (req, res) => {


    const post = req.body;

    // Debug----------------------
    //    console.log(req.userId);
    // -----------------------------

    // Creating a new post with given req params.
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    // Debug------------------------------
    // console.log(newPostMessage.creator);
    // -----------------------------------


    try {

        // Saving the new post.
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



// Controller to PATCH the new post
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    // Checking whether the id is correct mongoose objectId or not.
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    // Checking whether the id is correct mongoose objectId or not.
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}


// Controller to PATCH request for liking a post.
export const likePost = async (req, res) => {
    const { id } = req.params;


    // If the userId is not valid id
    if (!req.userId){
        return res.json({ message: "You are not authenticated to perform this operation ..." });
    }


    // Checking whether the id is correct mongoose objectId or not.
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    

    // Find the post to be liked
    const post = await PostMessage.findById(id);

    // Finding whether the user has already liked the post or npt
    const index = post.likes.findIndex((id) => id ===String(req.userId));

    // If not
    if (index === -1) {
        // Pushing the userId in the liked array of the user.
        post.likes.push(req.userId);
    }
    // If yes 
    else {

        // Else we remove the like
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    

    // Update the post
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}


export default router;