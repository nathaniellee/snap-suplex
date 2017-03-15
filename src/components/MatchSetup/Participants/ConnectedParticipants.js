import _ from 'lodash';
import { connect } from 'react-redux';
import actionCreators from '../../../actions/matchSetup/actionCreators';
import { selectors } from '../../../reducers/root';
import Participants from './Participants';

const pageSize = 10;
const selectionLimit = 2;

const mapStateToProps = (state) => {
	const {
		pageIndex,
		wrestlers,
	} = selectors.getMatchSetup(state);
	const wrestlerIds = _.map(wrestlers, 'id');
	const availableWrestlers = selectors.getWrestlersAsArray(state);
	const totalCount = _.size(availableWrestlers);
	const selectableWrestlers = _.isEmpty(availableWrestlers)
		? []
		: _(availableWrestlers)
			.chunk(pageSize)
			.nth(pageIndex)
			.map((wrestler) => {
				const isActive = _.includes(wrestlerIds, wrestler.id);
				return {
					...wrestler,
					isActive,
					isDisabled: (_.size(wrestlers) >= selectionLimit) && !isActive,
				};
			});

	return {
		pageIndex,
		selectableWrestlers,
		totalCount,
	};
};

const mapDispatchToProps = (dispatch) => ({
	onSelectPage: (pageIndex) => {
		dispatch(actionCreators.setPageIndex(pageIndex));
	},
	onSelectWrestler: (wrestler) => {
		dispatch(actionCreators.selectWrestler(wrestler));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Participants);
