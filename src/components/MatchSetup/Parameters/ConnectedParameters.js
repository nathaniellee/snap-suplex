import _ from 'lodash';
import { connect } from 'react-redux';
import actionCreators from '../../../actions/matchSetup/actionCreators';
import { selectors } from '../../../reducers/root';
import Parameters from './Parameters';

const mapStateToProps = (state) => selectors.getMatchSetup(state);

const mapDispatchToProps = (dispatch) => ({
	onChangeNumRounds: (numRounds) => {
		dispatch(actionCreators.setNumRounds(numRounds));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Parameters);
