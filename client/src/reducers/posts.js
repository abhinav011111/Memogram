import {
  FETCH_BY_SEARCH,
  FETCH_ALL,
  CREATE,
  DELETE,
  UPDATE,
} from "../constants/actionTypes";
//              State       Action
export default (state = [], action) => {
  // Switch case
  switch (action.type) {
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };

    case FETCH_BY_SEARCH:
      {
        console.log("here in reducer");
        console.log(action.payload)
        return { ...state, posts: action.payload };
      }

    default:
      return state;
  }
};
