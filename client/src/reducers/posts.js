import {
  FETCH_BY_SEARCH,
  FETCH_ALL,
  FETCH_POST,
  CREATE,
  DELETE,
  UPDATE,
  COMMENT,
  START_LOADING,
  END_LOADING,
  FETCH_BY_USER,
} from "../constants/actionTypes";
//              State       Action
export default (state = { isLoading: true, posts: [] }, action) => {
  // Switch case
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        }),
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
        //console.log("here in reducer");
        //console.log(action.payload)
        return { ...state, posts: action.payload };
      }
    case FETCH_BY_USER:
      {
        return {...state, posts:action.payload};
      }
    case FETCH_POST:
      {
        // console.log("here in reducer");
        // console.log(action.payload)
        return { ...state, post: action.payload.post };
      }

    default:
      return state;
  }
};
