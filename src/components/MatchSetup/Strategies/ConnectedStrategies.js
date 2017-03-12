import _ from 'lodash';
import { connect } from 'react-redux';
import actionCreators from '../../../actions/matchSetup/actionCreators';
import { selectors } from '../../../reducers/root';
import Strategies from './Strategies';

const mapStateToProps = (state) => {
	const {
		maxRounds,
		wrestlers: wrestlerIds,
	} = selectors.getMatchSetup(state);
	const strategies = selectors.getStrategies(state);
	const selectedWrestlers = _.map(wrestlerIds, (id) => selectors.getWrestler(state, id).wrestler);

	return {
		maxRounds,
		selectedWrestlers,
		strategies,
	};
};

const mapDispatchToProps = (dispatch) => ({
	onChangeStrategies: (strategies) => {
		dispatch(actionCreators.setStrategies(strategies));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Strategies);
