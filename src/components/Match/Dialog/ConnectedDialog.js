import _ from 'lodash';
import { connect } from 'react-redux';
import actionCreators from '../../../actions/matchSetup/actionCreators';
import { selectors } from '../../../reducers/root';
import Dialog from './Dialog';

const mapStateToProps = (state) => {
	const {
		matchWinnerId,
		numRounds,
		roundNumber,
		wrestlers,
	} = selectors.getMatchSetup(state);
	return {
		matchWinnerId,
		numRounds,
		roundNumber,
		wrestlers,
	};
};

const mapDispatchToProps = (dispatch) => ({
	onClickConfirmMatchOver: () => {
		dispatch(actionCreators.resetMatch());
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Dialog);
