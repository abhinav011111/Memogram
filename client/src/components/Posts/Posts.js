import React from 'react';

// Importing a single post functional component
import Post from './Post/Post.js';

import useStyles from './styles';

import {useSelector} from 'react-redux';

// Posts functional component to design the overall container for the posts.
const Posts = () => {


  const classes = useStyles();

  const posts = useSelector((state) => state.posts);

  //------DEBUG------------
  console.log(posts);
  //-----------------------

  
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

