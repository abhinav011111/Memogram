# Steps Followed in Creation

### We have created two directories : client and server

#### Commands run in client directory
* Run **npx create-react-app ./** to initialize an empty react app in client directory
* Updated package.json with required dependencies and run the command **npm install --legacy-peer-deps**
* Dependencies
```
  "dependencies": {
    "@material-ui/core": "^4.9.10",
    "@material-ui/icons": "^4.9.1",
    "@material-ui/lab": "^4.0.0-alpha.58",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "axios": "^0.19.2",
    "jwt-decode": "^3.1.2",
    "material-ui-chip-input": "^1.1.0",
    "moment": "^2.27.0",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-file-base64": "^1.0.3",
    "react-google-login": "^5.1.25",
    "react-redux": "^7.1.3",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.1",
    "redux": "^4.0.5",
    "redux-thunk": "^2.3.0"
  }
```

#### Commands run in server directory
* Run **npm init** to initialize node modules in server directory