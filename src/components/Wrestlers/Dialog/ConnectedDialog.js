import { connect } from 'react-redux';
import { selectors } from '../../../reducers/root';
import Dialog from './Dialog';

const mapStateToProps = (state, ownProps) => ({
	wrestler: selectors.getWrestler(state, ownProps.id),
});

const mapDispatchToProps = (dispatch, {
	onCancel,
	onSubmit,
}) => ({
	onCancel,
	onSubmit,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Dialog);
