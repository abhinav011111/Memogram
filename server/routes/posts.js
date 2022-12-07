import express from 'express'; // importing express

// post also imported
import {getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js'; // importing handler for the get method of the post router

// Creating router for the express server
// Router method is used.
const router = express.Router();

// the request is sent to '/' 
// but due to the prefix it goes to '/posts'
router.get('/', getPosts);

// post controller
router.post('/', createPost);

// update route
router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

router.patch('/:id/likePost', likePost);
// exporting default router
export default router;


// Where are the requests coming from?
// They are generated and sent from the front-end 

// Who does that?
// User? No, User only clicks the functionalities, what our react+redux does is take the click, take the required, form the request body, set the request parameters, and send them to the backend using axios.
