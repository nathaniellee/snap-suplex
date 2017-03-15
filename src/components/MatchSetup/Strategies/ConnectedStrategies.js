import _ from 'lodash';
import { connect } from 'react-redux';
import actionCreators from '../../../actions/matchSetup/actionCreators';
import { selectors } from '../../../reducers/root';
import Strategies from './Strategies';

const mapStateToProps = (state) => {
	const {
		numRounds,
		strategies: strategiesById,
		wrestlers: wrestlerIds,
	} = selectors.getMatchSetup(state);
	const selectedWrestlers = _.map(wrestlerIds, (wrestlerId) =>
		selectors.getWrestler(state, wrestlerId).wrestler);

	return {
		numRounds,
		selectedWrestlers,
		strategies: _.reduce(strategiesById, (results, strategyIds, wrestlerId) => ({
			...results,
			[wrestlerId]: _.map(strategyIds, (strategyId) => selectors.getStrategy(state, strategyId)),
		}), {}),
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
