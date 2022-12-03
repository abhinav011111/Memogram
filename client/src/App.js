// Importing react
import React from 'react';

// Importing Components

// Start Here
import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form.js';

import useStyles from './styles.js';
// End Here

// Importing the required components from the material using
/*
  Container
  Appbar
  Typography
  Grow
  Grid
*/

import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

// importing the image
import photos from './images/photos.png';

// Places the return html.
const App = () => {
  const classes = useStyles();
  return ( 
    // Container
    <Container maxWidth="lg">
      <AppBar className = {classes.appBar} position="static" color="inherit">
        <Typography className = {classes.heading} variant="h2" align="center">Memories</Typography>
        <img className = {classes.image} src = {photos} alt="memories" height="100" />
      </AppBar>


      

      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>

    </Container>
  );
}

export default App;
