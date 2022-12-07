import { FETCH_ALL, CREATE, DELETE, UPDATE } from '../constants/actionTypes';
//              State       Action
export default (posts = [], action) => {

    // Switch case
    switch (action.type) {
        case DELETE:
            return posts.filter((post)=>post._id!==action.payload);
        case UPDATE:
            // func changeVar(id, posts, payload){
            //     for(post : posts){
            //         if(post.id == payload.id){
            //             post = payload;
            //         }
            //         else{
            //             post = post
            //         }
            //     }
            // }
            return posts.map((post) => (post._id === action.payload._id) ? action.payload : post)

        
            
        case FETCH_ALL:

            return action.payload;
        case CREATE:
            // concatenation of arrays
            return [...posts, action.payload];
        default:
            return posts;
    }

};

