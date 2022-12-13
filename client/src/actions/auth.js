import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, history)=> async(dispatch)=>{
    try {

        const {data} = await api.signIn(formData); //through the api we connect with backend take some data and store here
        dispatch({type: AUTH ,data});  //we dispatch reducer auth with the data(token) we recieved.
        history.push('/'); // sign in is complete rediret to home page
    } catch (error) {
        console.log(error);
        
    }
}

export const signup = (formData, history)=> async(dispatch)=>{
    try {
        
        const {data} = await api.signUp(formData); //through the api we connect with backend take some data and store here
        dispatch({type: AUTH ,data});  //we dispatch reducer auth with the data(token) we recieved.
        history.push('/'); // sign in is complete rediret to home page
        
    } catch (error) {
        console.log(error);
        
    }
}