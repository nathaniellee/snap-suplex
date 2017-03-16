import _ from 'lodash';
import { connect } from 'react-redux';
import { selectors } from '../../../reducers/root';
import Dialog from './Dialog';

const mapStateToProps = (state) => {
	const { wrestlers } = selectors.getMatchSetup(state);
	return { wrestlers };
};

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Dialog);
