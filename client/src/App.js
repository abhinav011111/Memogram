import React, { useState, useEffect } from 'react'; //Importing react and hooks

// --------------------------------------------------------------------------------
//                 Importing components from material-ui/component
import { Container} from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// --------------------------------------------------------------------------------


// Importing components for redndering that create the page -------
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
// --------------------------------------------------------------------------------


// Importing dispatch function to call actions
import {useDispatch} from 'react-redux';

// Importing function to retrieve all the posts.
import { getPosts } from './actions/posts';
// --------------------------------------------------------------------------------




const App = () => {

  /*
    currentId is the id of the post being handled. If it is null, then it means a new post is being created.

    setCurrentId is the hook used to change or set the value of currentId in ALL the components.
  */

  // Current id of a post selected.
  // If the no post is selected, it means current id is NULL
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();


  // Using useEffect hook of the react to call a certain function when there is change in the dependencies passed
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </Container>
    </BrowserRouter>
    
  );
};

export default App;