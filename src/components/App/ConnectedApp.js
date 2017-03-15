import { connect } from 'react-redux';
import createFetchActionCreators from '../../actions/fetch/createAsyncActionCreators';
import api from '../../utils/api';
import App from './App';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
	const fetchActionCreators = createFetchActionCreators(api);

	return {
		fetchMoves: () => {
			dispatch(fetchActionCreators.fetchMoves());
		},
		fetchStrategies: () => {
			dispatch(fetchActionCreators.fetchStrategies());
		},
		fetchWrestlers: () => {
			dispatch(fetchActionCreators.fetchWrestlers());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
