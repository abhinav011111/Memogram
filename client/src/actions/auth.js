// Importing the AUTH actionType from the file so we can promt the Err.
import { AUTH } from '../constants/actionTypes';

// Importing all the content from the index.js
import * as api from '../api/index.js';

// Creating AUTH actions,
// for signing in and signing up 

// Signin
export const signin = (formData, history) => async(dispatch) =>{
    try {

        const {data} = await api.signIn(formData); 
        //through the api we connect with backend take some data and store here

        dispatch({type: AUTH ,data});  
        //we dispatch reducer auth with the data(token) we recieved.

        history.push('/'); 
        // sign in is complete rediret to home page

    } catch (error) {
        console.log(error);
    }
}

// signup
export const signup = (formData, history)=> async(dispatch)=>{
    try {

        const {data} = await api.signUp(formData);
        console.log(data)
         //through the api we connect with backend take some data and store here


        dispatch({type: AUTH ,data});  
        //we dispatch reducer auth with the data(token) we recieved.


        history.push('/'); // sign in is complete rediret to home page
        
    } catch (error) {
        console.log(error);
        
    }
}