import React from 'react'; //Importing react and hooks

// --------------------------------------------------------------------------------
//                 Importing components from material-ui/component
import { Container} from '@material-ui/core';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';




/*
  currentId is the id of the post being handled. If it is null, then it means a new post is being created.

  setCurrentId is the hook used to change or set the value of currentId in ALL the components.
*/
const App = () => {

  // Current id of a post selected.
  // If the no post is selected, it means current id is NULL
  

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