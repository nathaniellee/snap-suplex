import { connect } from 'react-redux';
import createFetchActionCreators from '../../actions/fetch/createAsyncActionCreators';
import api from '../../utils/api';
import App from './App';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
	const fetchActionCreators = createFetchActionCreators(api);

	return {
		fetchWrestlers: () => {
			dispatch(fetchActionCreators.fetchWrestlers());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
