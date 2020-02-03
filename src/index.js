import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';

const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
	apiKey: 'AIzaSyCaMT9bvC9a3EYcPc7feocRLRE9gIPnvOc',
	authDomain: 'messenger-app-87e97.firebaseapp.com',
	databaseURL: 'https://messenger-app-87e97.firebaseio.com',
	projectId: 'messenger-app-87e97',
	storageBucket: 'messenger-app-87e97.appspot.com',
	messagingSenderId: '242464523070',
	appId: '1:242464523070:web:fff5c3978b2c816a5a226f',
	measurementId: 'G-JS1L952X3Q',
});

const App = () => (
	<Router>
		<div id="routing-container">
			<div>Hello from the main page</div>
			<Route exact path="/login" component={LoginComponent} />
			<Route exact path="/signup" component={SignupComponent} />
			<Route exact path="/dashboard" component={DashboardComponent} />
		</div>
	</Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
