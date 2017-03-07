import { connect } from 'react-redux';
import createWrestlerActionCreators from '../../actions/wrestlers/createAsyncActionCreators';
import api from '../../utils/api';
import Wrestlers from './Wrestlers';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
	const wrestlerActionCreators = createWrestlerActionCreators(api);

	return {
		onAddWrestler: (wrestler) => {
			dispatch(wrestlerActionCreators.addWrestler(wrestler));
		},
		onUpdateWrestler: (wrestler) => {
			dispatch(wrestlerActionCreators.updateWrestler(wrestler));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Wrestlers);
