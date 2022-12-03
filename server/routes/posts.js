import express from 'express'; // importing express

import {getPosts, createPost} from '../controllers/posts.js'; // importing handler for the get method of the post router

// Creating router for the express server
// Router method is used.
const router = express.Router();

// the request is sent to '/' 
// but due to the prefix it goes to '/posts'
router.get('/', getPosts);
router.post('/', createPost);

// exporting default router
export default router;