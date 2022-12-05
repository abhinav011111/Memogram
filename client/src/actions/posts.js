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
        const action = {type : 'FETCH_ALL', payload : data};


        // returning the action using the dispatch function of REDUX-THUNK
        dispatch(action);

    } catch (error) {

        // err
        console.error(error.message);
    }
};

