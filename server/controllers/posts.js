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

    // contains the req body....
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

export const updatePost = async (req, res) =>{  

    // finding the id of the post to be changed
    const {id : _id} = req.params;

    // Old Post
    const post = req.body;


    // Here we actually check whether the given id is a valid one or not.
    // We will use validator of the mongoose.
    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).send('The id given is not valid. Not found...');
    }

    // We will wait for the new post using the find findByIdAndUpdate function
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new : true});

    res.json(updatedPost);
}
