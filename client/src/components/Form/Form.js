import React, { useState, useEffect } from 'react';

// Importing the required components.
import { TextField, Button, Typography, Paper } from '@material-ui/core';

import {useDispatch, useSelector} from 'react-redux';

// Import file base to handle image-data === base-64
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

import {createPost, updatePost} from '../../actions/posts';



// form component
const Form = ({currentId, setCurrentId}) => {

  // Creating a state for all the Posts
  // Initially a NULL state is defined. It is also the DEFAULT state of the post.
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  
  // When is current Id null? When we are not editing any posts!!!!
  // post is equal to null post when the current id is null, otherwise its value is equal to the value of the post that we will edit.
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // We find the user which is stored in the local-storage and parse it in JSON.
  const user = JSON.parse(localStorage.getItem('profile'));

  // useEffect with dependencies
  useEffect(() => {
    if(post) setPostData(post);
  }, [post]);


  // Clear function to clean the form
  const clear = () =>{
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // If we have called the submit button and there is a non-null id, 
    // then we will call the update method
    // else we will call the create method
    if(currentId){
      dispatch(updatePost(currentId, {...postData,name : user?.result?.name}));
      // Clear function called.
    clear();
    }
    else{

      if(!postData.title){
        alert("Title cannot be empty...")
      }

      else
        dispatch(createPost({...postData,name:user?.result?.name},history));
      
      // Clear function called.
    clear();
    }    
  };


  // If we dont have the user already assigned,
  // then we just show a prompt message to the user
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }
  
  return (

    // Wrapper of Paper around the form
    <Paper className={classes.paper} raised elevation={6}>

      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>

        <Typography variant="h4">{currentId ? `Editing ${post.title}` : 'Creating a Memory'}</Typography>

        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>

        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

      </form>
    </Paper>
  );
};

export default Form;