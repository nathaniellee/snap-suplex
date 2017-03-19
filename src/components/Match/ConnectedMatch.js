import _ from 'lodash';
import { connect } from 'react-redux';
import { selectors } from '../../reducers/root';
import Match from './Match';

const mapStateToProps = (state) => {
	const matchState = selectors.getMatchSetup(state);
	return _.omit(matchState, 'pageIndex');
};

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Match);
