import _ from 'lodash';
import { connect } from 'react-redux';
import actionCreators from '../../../actions/matchSetup/actionCreators';
import { selectors } from '../../../reducers/root';
import CurrentRound from './CurrentRound';

const mapStateToProps = (state) => {
	const matchState = selectors.getMatchSetup(state);
	return _.omit(matchState, 'rounds');
};

const mapDispatchToProps = (dispatch) => ({
	onChangeStrategies: (strategies) => {
		dispatch(actionCreators.setStrategies(strategies));
	},
	onResolve: () => {
		dispatch(actionCreators.resolveCurrentRound());
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CurrentRound);
