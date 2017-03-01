import _ from 'lodash';
import { connect } from 'react-redux';
import { selectors } from '../../../reducers/root';
import Table from './Table';

const mapStateToProps = (state) => {
	const wrestlers = selectors.getWrestlersAsArray(state);
	return {
		wrestlers: _.chain(wrestlers)
			.sortBy('id')
			.reverse()
			.value(),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => ({ ...ownProps });

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Table);
