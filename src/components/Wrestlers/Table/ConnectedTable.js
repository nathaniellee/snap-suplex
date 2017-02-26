import { connect } from 'react-redux';
import { selectors } from '../../../reducers/root';
import Table from './Table';

const mapStateToProps = (state) => ({
	wrestlers: selectors.getWrestlersAsArray(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({ ...ownProps });

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Table);
