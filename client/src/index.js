import React from 'react'; // Import react 
import ReactDOM from 'react-dom'; // Importing React DOM.


// -------------------------------------------------------------------
//           Here we will import functionalities from redux

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

// --------------------------------------------------------------------

// Importing index.css
import './index.css';

import App from './App'; // Importing App function component.

// Creating a store
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(

    // Provider applies the store with all the functionalities of the store to the App
    <Provider store = { store }>
        <App/>
    </Provider>
    
    , 
    document.getElementById('root')
); // Changes root element in index.html to App functional component