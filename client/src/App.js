import React, { useState, useEffect } from "react"; //Importing react and hooks

// --------------------------------------------------------------------------------
//                 Importing components from material-ui/component
import { Container } from "@material-ui/core";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

/*
  currentId is the id of the post being handled. If it is null, then it means a new post is being created.

  setCurrentId is the hook used to change or set the value of currentId in ALL the components.
*/
const App = () => {
  // Current id of a post selected.
  // If the no post is selected, it means current id is NULL
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path = "/posts/user" exact component = {Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route
              path="/auth"
              exact
              component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
            />
          </Switch>
        </Container>
      </BrowserRouter>

      
    </>
  );
};

export default App;
