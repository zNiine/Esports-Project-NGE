import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import { BrowserRouter, Route } from "react-router-dom"


var firebaseConfig = {
    apiKey: "'----'",
    authDomain: "'----'-'----'.'----'.com",
    databaseURL: "'----'://'----'-686d9.'----'.com",
    projectId: "'----'-686d9",
    storageBucket: "'----'-686d9.appspot.com",
    messagingSenderId: "'----'",
    appId: "1:287512818815:'----':8e4993ca023baf27f57b4a",
    measurementId: "G-'----'"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



     
 

ReactDOM.render(
<BrowserRouter>
  <Route path="/" component={App} />
</BrowserRouter>
, 

document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();