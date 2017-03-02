import _ from 'lodash';
import { connect } from 'react-redux';
import { selectors } from '../../../reducers/root';
import Dialog from './Dialog';

const mapStateToProps = (state, { id }) => {
	const wrestler = selectors.getWrestler(state, id);
	const moveIdsByStat = wrestler.moves;
	const movesByStat = _.reduce(moveIdsByStat, (results, moveIds, statKey) => {
		return {
			...results,
			[statKey]: _.map(moveIds, (moveId) => selectors.getMove(state, moveId)),
		};
	}, {});

	return {
		wrestler: {
			...wrestler,
			moves: movesByStat,
		},
	};
};

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
