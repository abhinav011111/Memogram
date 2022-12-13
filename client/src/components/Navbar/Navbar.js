<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";

// --------------------------------------------------------------------------------
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
// --------------------------------------------------------------------------------

import useStyles from "./styles";
import photos from "../../images/photos.png";

// --------------------------------------------------------------------------------
=======
import React, { useEffect, useState } from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import { useDispatch } from 'react-redux';
>>>>>>> db538e8ce9b2b00d3b4c524b47b54788aa517556

const Navbar = () => {
<<<<<<< HEAD
  const classes = useStyles();

  const user = null;

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={photos}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar classname={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
=======
    
    const classes = useStyles();
    
    const [user,setUser]= useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    console.log(user);

    const logout = () =>
    {
        dispatch({type: 'LOGOUT'});
        history.push('/');
        setUser(null);
    }

    useEffect(()=> {
      const token = user?.token;

      setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    return(
<AppBar className = {classes.appBar} position="static" color="inherit">
    <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className = {classes.heading} variant="h2" align="center">Memories</Typography>
        <img className = {classes.image} src = {photos} alt="memories" height="60" />
    </div>
    <Toolbar classname={classes.toolbar}  >
      {user ? (
        <div className = {classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src ={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant= "h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color= "secondary" onClick={logout}>Logout</Button>
        </div>
      ):(
        <Button component= {Link} to="/auth" variant="contained" color="primary">Sign In</Button>
      )
      }
    </Toolbar>
      </AppBar>
    )
}
>>>>>>> db538e8ce9b2b00d3b4c524b47b54788aa517556

export default Navbar;
