import _ from 'lodash';
import { connect } from 'react-redux';
import { selectors } from '../../../reducers/root';
import Dialog from './Dialog';

const mapStateToProps = (state, { id }) => selectors.getWrestler(state, id);

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
