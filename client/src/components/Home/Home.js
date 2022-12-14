import React, { useState, useEffect } from 'react'; //Importing react and hooks

// --------------------------------------------------------------------------------
//                 Importing components from material-ui/component
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
// --------------------------------------------------------------------------------



//import { BrowserRouter, Switch, Route } from 'react-router-dom';
// Importing different components

import { getPosts } from '../../actions/posts';

// import useStyles from './styles'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();
//   const classes = useStyles();

  // As soon as you open the app, you will see all the posts by DEFAULT
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

    return(
    <Grow in>
        <Container>
          <Grid  container justifyContent ="space-between" alignItems="stretch" spacing={3}>
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
)};

export default Home;