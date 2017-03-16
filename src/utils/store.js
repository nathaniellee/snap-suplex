import {
	applyMiddleware,
	compose,
	createStore,
} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/root';

export default createStore(reducer, {}, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : x => x,
));
