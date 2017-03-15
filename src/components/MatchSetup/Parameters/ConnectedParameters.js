import _ from 'lodash';
import { connect } from 'react-redux';
import actionCreators from '../../../actions/matchSetup/actionCreators';
import { selectors } from '../../../reducers/root';
import Parameters from './Parameters';

const mapStateToProps = (state) => selectors.getMatchSetup(state);

const mapDispatchToProps = (dispatch) => ({
	onChangeMaxRounds: (maxRounds) => {
		dispatch(actionCreators.setNumRounds(maxRounds));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Parameters);
