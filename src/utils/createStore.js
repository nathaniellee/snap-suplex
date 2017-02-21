import {
	applyMiddleware,
	compose,
	createStore,
} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/root';

export default function (initialState) {
	return createStore(reducer, initialState, compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : x => x,
	));
}
