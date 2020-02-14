import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';

const firebase = require("firebase");
require("firebase/firestore");

//In a production app, you wouldn't have this information public
firebase.initializeApp({
    apiKey: "AIzaSyCL9eO3OQex7z0FEm_ZgKonpyRH2ZaQXMg",
    authDomain: "im-app-3c88f.firebaseapp.com",
    databaseURL: "https://im-app-3c88f.firebaseio.com",
    projectId: "im-app-3c88f",
    storageBucket: "im-app-3c88f.appspot.com",
    messagingSenderId: "863088931234",
    appId: "1:863088931234:web:b17473334f851e4c6e82fb",
    measurementId: "G-RHC30W1KVR"
});

const routing = (
    <Router> 
        <div id= 'routing-container'>
            <Route path='/login' component={LoginComponent}></Route>
            <Route path='/signup' component={SignupComponent}></Route>
            <Route path='/dashboard' component={DashboardComponent}></Route>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
