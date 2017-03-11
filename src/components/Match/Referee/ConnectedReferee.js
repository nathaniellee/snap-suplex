import _ from 'lodash';
import { connect } from 'react-redux';
import actionCreators from '../../../actions/match/actionCreators';
import { selectors } from '../../../reducers/root';
import Referee from './Referee';

const mapStateToProps = (state) => selectors.getMatchSetup(state);

const mapDispatchToProps = (dispatch) => ({
	onChangeDqRating: (dqRating) => {
		dispatch(actionCreators.setDqRating(dqRating));
	},
	onChangeRefScore: (refScore) => {
		dispatch(actionCreators.setRefScore(refScore));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Referee);
