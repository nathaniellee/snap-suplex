import _ from 'lodash';
import { connect } from 'react-redux';
import { selectors } from '../../reducers/root';
import Match from './Match';

const mapStateToProps = (state) => {
	const {
		dqRating,
		numRounds,
		refScore,
		wrestlers,
	} = selectors.getMatchSetup(state);
	return {
		dqRating,
		numRounds,
		refScore,
		wrestlers,
	};
};

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Match);