import React from 'react';

// Importing a single post functional component
import Post from './Post/Post.js';

import useStyles from './styles.js'

// Posts functional component to design the overall container for the posts.
const Posts = () => {
  const classes = useStyles();
  return (

    // We have used a binder to return number of components different from each other
    <>
        <h1>Posts</h1>
        <Post/>
        <Post/>
    </>
    
  )
};

export default Posts;

