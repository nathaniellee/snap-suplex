import { connect } from 'react-redux';
import { selectors } from '../../../reducers/root';
import Grid from './Grid';

const mapStateToProps = (state) => ({
	wrestlers: selectors.getWrestlersAsArray(state),
});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Grid);
