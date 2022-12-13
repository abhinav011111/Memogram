/*
    Axios is a promised-based HTTP client for JavaScript. It has the ability to make HTTP requests from the browser and handle the transformation of request and response data.
*/
import axios from 'axios';

// URL on which the backend send the posts.
const API = axios.create({baseURL:'http://localhost:5000'});
API.interceptors.request.use((req)=>{
     if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
     }
     return req;
});

// Creating a fetchPost function to retrieve the posts
// using the axios.get() function.
export const fetchPosts = () => API.get('/posts');


// Creating a create post request to the server with the data new post
// using the axios.post() function.
export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) =>API.post('/users/signin',formData);
export const signUp = (formData) =>API.post('/users/signup',formData);
  