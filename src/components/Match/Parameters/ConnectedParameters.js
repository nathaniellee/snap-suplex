import _ from 'lodash';
import { connect } from 'react-redux';
import actionCreators from '../../../actions/match/actionCreators';
import { selectors } from '../../../reducers/root';
import Parameters from './Parameters';

const mapStateToProps = (state) => selectors.getMatch(state);

const mapDispatchToProps = (dispatch) => ({
	onChangeMaxRounds: (maxRounds) => {
		dispatch(actionCreators.setMaxRounds(maxRounds));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Parameters);
