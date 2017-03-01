import { connect } from 'react-redux';
import actionCreators from '../../actions/wrestlers/actionCreators';
import Wrestlers from './Wrestlers';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
	onAddWrestler: (wrestler) => {
		dispatch(actionCreators.addWrestler(wrestler));
	},
	onUpdateWrestler: (wrestler) => {
		dispatch(actionCreators.updateWrestler(wrestler));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Wrestlers);
