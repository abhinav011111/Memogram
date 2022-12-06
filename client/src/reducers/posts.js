
//              State       Action
export default (posts = [], action) => {

    // Switch case
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        default:
            return posts;
    }

};