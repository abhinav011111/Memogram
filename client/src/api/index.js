/*
    Axios is a promised-based HTTP client for JavaScript. It has the ability to make HTTP requests from the browser and handle the transformation of request and response data.
*/
import axios from 'axios';

// URL on which the backend send the posts.
const url = 'http://localhost:5000/posts';

// Creating a fetchPost function to retrieve the posts
// using the axios.get() function.
export const fetchPosts = () => axios.get(url);


// Creating a create post request to the server with the data new post
// using the axios.post() function.
export const createPost = (newPost) => axios.post(url, newPost);