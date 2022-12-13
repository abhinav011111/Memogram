import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";

// Get posts
export const getPosts = async (req, res) => {

    // Here we have used async-await function
    // try block is initiated when there is no error
    // catch is used for error
    try {
        
        // We use await and is use find() function to return an array of all the posts;
        const postMessages = await PostMessage.find();
        /*
            Response
                status code : 200
                body : array of all posts
        */
        res.status(200).json(postMessages);
    } catch (error) {
        /*
            Response
                status code : 404
                body : error message
        */
        res.status(404).json({ mesage: error.message });
    }
};


// To create a new post
export const createPost = async (req, res) => {


    /*
        What does the req contains?
        It contains all the required information to create a database object as defined in the schema.
        
        creator, likeCount, title....
    */

    // contains the req body....

    // Paramters
    const post = req.body;
    // creating a new post
    const newPost = new PostMessage(post);


    try {

        // save it haha.
        await newPost.save();
    } catch (error) {
        /*
            Response
                status code : 409
                body : error message
        */
        res.status(409).json({ mesage: error.message });
    }
};

export const updatePost = async (req, res) => {

    // finding the id of the post to be changed
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    // Here we actually check whether the given id is a valid one or not.
    // We will use validator of the mongoose.
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    // We will wait for the new post using the find findByIdAndUpdate function
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {

    // finding the id of the post to be changed
    const { id } = req.params;
   
    
    // Here we actually check whether the given id is a valid one or not.
    // We will use validator of the mongoose.
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    

    // Removing the post with the passed Id
    await PostMessage.findByIdAndRemove(id);

    console.log("Deleted");
}

export const likePost = async (req, res) => {

    // finding the id of the post to be changed
    const { id } = req.params;
    
    
    // Here we actually check whether the given id is a valid one or not.
    // We will use validator of the mongoose.
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post= await PostMessage.findById(id);

    // We will wait for the new post using the find findByIdAndUpdate function
    // and increase the like-count by 1 everytime we click.
    const updatedPost= await PostMessage.findByIdAndUpdate(id,{likeCount: post.likeCount+1},{new:true})

    res.json(updatedPost);
}