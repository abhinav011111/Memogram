/*
    Axios is a promised-based HTTP client for JavaScript. It has the ability to make HTTP requests from the browser and handle the transformation of request and response data.
*/
import axios from 'axios';

// URL on which the backend send the posts.
const API = axios.create({baseURL:'https://memogram-backend.onrender.com'});

// We intercept the request, and check whether an authorized actions is taking place
// We find 'profile' from the local-storage
// If it is found we set the headers,
// "Bearer token"

API.interceptors.request.use((req)=>{
     if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
     }

     // Transit the request forward
     return req;
});

// Creating a fetchPost function to retrieve the posts
// using the axios.get() function.
export const fetchPosts = (page) => API.get(`/posts/?page=${page}`);

export const fetchPostsByUser = (userId) =>
    // console.log('Reached in API');
    // console.log(userId);
    API.get(`/posts/user?userQuery=${userId}`)
;

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const fetchPost =(id) => API.get(`/posts/${id}`);
// Creating a create post request to the server with the data new post
// using the axios.post() function.
export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (formData) =>API.post('/users/signin',formData);
export const signUp = (formData) =>API.post('/users/signup',formData);
  