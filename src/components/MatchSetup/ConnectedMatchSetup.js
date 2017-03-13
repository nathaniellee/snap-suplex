import _ from 'lodash';
import { connect } from 'react-redux';
import actionCreators from '../../actions/matchSetup/actionCreators';
import { selectors } from '../../reducers/root';
import MatchSetup from './MatchSetup';

const mapStateToProps = (state) => {
	const { wrestlers } = selectors.getMatchSetup(state);
	const { isMatchUnderway } = selectors.getMatch(state);

	return {
		isMatchUnderway,
		isStartDisabled: _.size(wrestlers) < 2
	};
};

const mapDispatchToProps = (dispatch) => ({
	onClickStartMatch: () => {
		dispatch(actionCreators.startMatch());
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MatchSetup);
