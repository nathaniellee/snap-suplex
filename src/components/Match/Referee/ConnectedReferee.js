import _ from 'lodash';
import { connect } from 'react-redux';
import actionCreators from '../../../actions/match/actionCreators';
import { selectors } from '../../../reducers/root';
import Referee from './Referee';

const mapStateToProps = (state) => selectors.getMatch(state);

const mapDispatchToProps = (dispatch) => ({
	onChangeRefScore: (refScore) => {
		dispatch(actionCreators.setRefScore(refScore));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Referee);
