import { connect } from 'react-redux';
import { selectors } from '../../../reducers/root';
import Grid from './Grid';

const mapStateToProps = (state) => {
	const { getWrestlers } = selectors;
	return {
		wrestlers: getWrestlers(state),
	};
};

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Grid);
