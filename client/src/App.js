import React, { useState, useEffect } from 'react'; //Importing react and hooks

// --------------------------------------------------------------------------------
//                 Importing components from material-ui/component
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
// --------------------------------------------------------------------------------

// Importing different components
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import photos from './images/photos.png';


/*
  currentId is the id of the post being handled. If it is null, then it means a new post is being created.

  setCurrentId is the hook used to change or set the value of currentId in ALL the components.
*/
const App = () => {

  // Current id of a post selected.
  // If the no post is selected, it means current id is NULL
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();
  const classes = useStyles();

  // As soon as you open the app, you will see all the posts by DEFAULT
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className = {classes.appBar} position="static" color="inherit">
        <Typography className = {classes.heading} variant="h2" align="center">Memories</Typography>
        <img className = {classes.image} src = {photos} alt="memories" height="100" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent ="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              {/* we pass the function to make other components select any post*/}
              <Posts setCurrentId = {setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId = {currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>

    </Container>
  );
};

export default App;