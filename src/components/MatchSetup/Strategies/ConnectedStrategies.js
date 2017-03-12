import _ from 'lodash';
import { connect } from 'react-redux';
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

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Strategies);