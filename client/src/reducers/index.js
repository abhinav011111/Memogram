import { combineReducers } from "redux"; // To combine all the reducers

// importing posts
import posts from './posts';

// combine the reducer posts
export default combineReducers({ posts }); // this is a reducer
