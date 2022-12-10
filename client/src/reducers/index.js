import { combineReducers } from "redux"; // To combine all the reducers

// importing posts
import posts from './posts';
import auth from './auth';

// combine the reducer posts
export default combineReducers({ posts, auth }); // this is a reducer
