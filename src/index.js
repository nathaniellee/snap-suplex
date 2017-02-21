import React from 'react';
import { render } from 'react-dom';
import {
	hashHistory,
	IndexRoute,
	Route,
	Router,
} from 'react-router';
import App from './components/App/App';
import Home from './components/Home/Home';
import Matches from './components/Matches/Matches';
import Wrestlers from './components/Wrestlers/Wrestlers';
import './index.css';

render(
  <Router history={hashHistory}>
  	<Route path='/' component={App}>
  		<IndexRoute component={Home} />
	  	<Route path='/matches' component={Matches} />
	  	<Route path='/wrestlers' component={Wrestlers} />
  	</Route>
  </Router>,
  document.getElementById('root'),
);
