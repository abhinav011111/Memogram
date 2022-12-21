import { FETCH_BY_SEARCH,FETCH_ALL,FETCH_POST, CREATE, START_LOADING,END_LOADING, DELETE,COMMENT, UPDATE, FETCH_BY_USER } from '../constants/actionTypes';
import * as api from '../api';


// In react, instead of async await we use redux-thunk to provide asynchrounous calls.
export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id);
  
      dispatch({ type: FETCH_POST, payload: { post: data } });

      dispatch({type: END_LOADING});
    } catch (error) {
      console.log(error);
    }
  };



export const getPosts = (page) => async (dispatch) => {

    try {
        // Bringing the data from the API using fetchPosts;
        dispatch({type: START_LOADING});
        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

        // Defining an action
        /*
            Action 
                type : FETCH_ALL
                payload : All the posts in form of an array
        */
        // console.log(data);
        const action = { type: FETCH_ALL, payload: { data, currentPage, numberOfPages } };


        // returning the action using the dispatch function of REDUX-THUNK
        dispatch(action);
        dispatch({type: END_LOADING});

    } catch (error) {

        // err
        console.log(error.message);
    }
};

export const getPostByUser = (userId) => async(dispatch) => {
    try{
        // console.log('Request reached in action');
        // console.log(userId);
        dispatch({type : START_LOADING});
        const {data : {data}} = await api.fetchPostsByUser(userId);
        // console.log('again in action');
        // console.log({data});
        const action = {type : FETCH_BY_USER, payload : data};
         // console.log(data);
        dispatch(action);

        dispatch({type : END_LOADING});
    }
    catch(error){
        console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {

    try {
        dispatch({type: START_LOADING});
        // console.log(searchQuery);
        // Bringing the data from the API using fetchPosts;
        const {data : {data}} = await api.fetchPostsBySearch(searchQuery);

        // Defining an action
        /*
            Action 
                type :FETCH_BY_SEARCH
                payload : posts with the given queries
        */
        // const action = {type : FETCH_ALL, payload : data};


        // returning the action using the dispatch function of REDUX-THUNK
        // dispatch(action);
        //console.log("here in action");
        //console.log(data);
        const action = {type : FETCH_BY_SEARCH, payload : data};
         // console.log(data);
        dispatch(action);
        dispatch({type: END_LOADING});

    } catch (error) {

        // err
        console.log(error);
    }
};





export const createPost = (post,history) => async (dispatch) => {

    try {
        dispatch({type: START_LOADING});
        // Bringing the data from the API using fetchPosts;
        const {data} = await api.createPost(post);

        // Defining an action
        /*
            Action 
                type : CREATE
                payload : new post to be created
        */
       history.push(`/posts/${data._id}`);
        const action = {type : CREATE, payload : data};


        // returning the action using the dispatch function of REDUX-THUNK
        dispatch(action);
        dispatch({type: END_LOADING});

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

export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);
  
      dispatch({ type: COMMENT, payload: data });
  
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };