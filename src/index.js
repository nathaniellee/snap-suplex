import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
	hashHistory,
	IndexRoute,
	Route,
	Router,
} from 'react-router';
import App from './components/App/ConnectedApp';
import Home from './components/Home/Home';
import MatchSetup from './components/MatchSetup/ConnectedMatchSetup';
import Matches from './components/Matches/Matches';
import Wrestlers from './components/Wrestlers/ConnectedWrestlers';
import store from './utils/store';
import '../node_modules/lucid/dist/index.css';
import './index.css';

render(
	<Provider store={store}>
	  <Router history={hashHistory}>
	  	<Route path='/' component={App}>
	  		<IndexRoute component={Home} />
	  		<Route path='/match' component={MatchSetup} />
		  	<Route path='/matches' component={Matches} />
		  	<Route path='/wrestlers' component={Wrestlers} />
	  	</Route>
	  </Router>
	</Provider>,
  document.getElementById('root'),
);
