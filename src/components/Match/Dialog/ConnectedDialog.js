import _ from 'lodash';
import { connect } from 'react-redux';
import { selectors } from '../../../reducers/root';
import Dialog from './Dialog';

const mapStateToProps = (state) => {
	const { wrestlers: wrestlerIds } = selectors.getMatchSetup(state);
	const selectedWrestlers = _.map(wrestlerIds, (id) => selectors.getWrestler(state, id).wrestler);
	return { selectedWrestlers };
};

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Dialog);