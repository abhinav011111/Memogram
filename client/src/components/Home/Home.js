import React, { useState, useEffect } from "react"; //Importing react and hooks

// --------------------------------------------------------------------------------
//                 Importing components from material-ui/component
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useDispatch } from "react-redux";
// --------------------------------------------------------------------------------

import { useHistory, useLocation } from "react-router-dom";
// Importing different components

import { commentPost, getPosts, getPostsBySearch, getPostByUser} from "../../actions/posts";

// import useStyles from './styles'
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

// Importing the Pagination Component
import Pagination from "../Pagination";

import useStyles from './styles.js';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();
  //   const classes = useStyles();

  // To perform the query
  const query = useQuery();
  // Using the history of the webpage locations
  const history = useHistory();

  // Current page selector
  const page = query.get("page") || 1;
  // console.log(page);

  // To get the search Queries
  const searchQuery = query.get("searchQuery");


  const [search, setSearch] = useState('');

  const [tags, setTags] = useState([]);
  
  const [id, setId] = useState(0); 

  const classes =  useStyles();

  const user = JSON.parse(localStorage.getItem('profile'));

  // // As soon as you open the app, you will see all the posts by DEFAULT
  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleMyPost = () => {
    if(!user){
      alert('You are not logged in...');
    }
    else{
      const userId = user?.result.googleId || user?.result._id;
      setId(1);
      dispatch(getPostByUser(userId));
      history.push('/posts/user?userQuery');
    }
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      // console.log("here in home");
      // console.log(search);
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
       // console.log(tags);
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyDown= {handleKeyPress}
                fullWidth
                value= {search}
                onChange={(e) => setSearch(e.target.value)}
              />
               <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>

              <Button variant="contained" color="secondary" fullWidth onClick = {handleMyPost}>Find my posts</Button>

            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length && !id )&&(
              <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
              </Paper>
            )}
              
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
