import { FETCH_BY_SEARCH,FETCH_ALL, CREATE, DELETE, UPDATE } from '../constants/actionTypes';
import * as api from '../api';


// In react, instead of async await we use redux-thunk to provide asynchrounous calls.

export const getPosts = () => async (dispatch) => {

    try {
        // Bringing the data from the API using fetchPosts;
        const {data} = await api.fetchPosts();

        // Defining an action
        /*
            Action 
                type : FETCH_ALL
                payload : All the posts in form of an array
        */
        const action = {type : FETCH_ALL, payload : data};


        // returning the action using the dispatch function of REDUX-THUNK
        dispatch(action);

    } catch (error) {

        // err
        console.log(error.message);
    }
};


export const getPostsBySearch = (searchQuery) => async (dispatch) => {

    try {
        // Bringing the data from the API using fetchPosts;
        const {data : {data}} = await api.fetchPostsBySearch(searchQuery);

        // Defining an action
        /*
            Action 
                type : FETCH_ALL
                payload : All the posts in form of an array
        */
        // const action = {type : FETCH_ALL, payload : data};


        // returning the action using the dispatch function of REDUX-THUNK
        // dispatch(action);
        const action = {type : FETCH_BY_SEARCH, payload : data};
         // console.log(data);
        dispatch(action);

    } catch (error) {

        // err
        console.log(error);
    }
};





export const createPost = (post) => async (dispatch) => {

    try {
        // Bringing the data from the API using fetchPosts;
        const {data} = await api.createPost(post);

        // Defining an action
        /*
            Action 
                type : CREATE
                payload : new post to be created
        */
        const action = {type : CREATE, payload : data};


        // returning the action using the dispatch function of REDUX-THUNK
        dispatch(action);

    } catch (error) {

        // err
        console.log(error.message);
    }
};

export const updatePost = (id, post) => async (dispatch) => {

    try {
        // Bringing the data from the API using fetchPosts;
        const {data} = await api.updatePost(id, post);

        // Defining an action
        /*
            Action 
                type : UPDATE
                payload : updated post
        */
        const action = {type : UPDATE, payload : data};


        // returning the action using the dispatch function of REDUX-THUNK
        dispatch(action);

    } catch (error) {

        // err
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {

    try {
        // Bringing the data from the API using fetchPosts;
        await api.deletePost(id);

        // Defining an action
        /*
            Action 
                type : UPDATE
                payload : updated post
        */
        const action = {type : DELETE, payload : id};


        // returning the action using the dispatch function of REDUX-THUNK
        dispatch(action);

    } catch (error) {

        // err
        console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {

    try {
        // Bringing the data from the API using fetchPosts;
        const {data} = await api.likePost(id);

        // Defining an action
        /*
            Action 
                type : UPDATE
                payload : updated post
        */
        const action = {type : UPDATE, payload : data};


        // returning the action using the dispatch function of REDUX-THUNK
        dispatch(action);

    } catch (error) {

        // err
        console.log(error);
    }
};
