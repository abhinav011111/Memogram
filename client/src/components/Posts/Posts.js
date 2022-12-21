import React from 'react';

import {Grid, CircularProgress} from '@material-ui/core';
// Importing a single post functional component
import Post from './Post/Post.js';

import useStyles from './styles';

import {useSelector} from 'react-redux';

// Posts functional component to design the overall container for the posts.
const Posts = ({setCurrentId}) => {


  const classes = useStyles();

  const { posts, isLoading } = useSelector((state) => state.posts);

  //------DEBUG------------
  // console.log("here");
  // console.log(posts);
  //-----------------------
if(!posts.length && !isLoading) return 'No posts';
  
  return (

    // We have used a binder to return number of components different from each other
    isLoading ? <CircularProgress/> : (
      <Grid className = {classes.container} container alignItems = 'stretch' spacing={3}>
        {
          // for auto post : posts
          posts.map((post) =>(
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
              {/* It is a component with value equal to post; */}
              <Post post = {post} setCurrentId = {setCurrentId}/>
            </Grid>
          ))
        }
      </Grid>
    )
  )
};

export default Posts;

