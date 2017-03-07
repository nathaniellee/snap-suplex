import _ from 'lodash';
import actionCreators from './actionCreators';
import createFetchActionCreators from '../fetch/createAsyncActionCreators';

export default (api) => ({
	addWrestler: (wrestler) => (dispatch) => {
		const onPostMoveSuccess = (move) => {
			dispatch(actionCreators.postMoveSuccess(move));
			return move;
		};
		const onPostMoveFailure = (error) => {
			dispatch(actionCreators.postMoveFailure(error));
			return Promise.reject(error);
		};
		const getMovePromise = (move) => {
			dispatch(actionCreators.postMoveRequest());
			return api.moves.post(move).then(onPostMoveSuccess, onPostMoveFailure);
		};

		const movePromises = _.map([
			'bra',
			'dex',
			'str',
			'tec',
			'fin',
		], (stat) => {
			return Promise.all(_.map(wrestler.moves[stat], getMovePromise))
				.then((moves) => ({ [stat]: _.map(moves, 'id') }));
		});

		return Promise.all(movePromises).then((moves) => {
			const newWrestler = {
				...wrestler,
				moves: _.reduce(moves, (results, statMoves) => ({
					...results,
					...statMoves,
				}), {}),
			};
			dispatch(actionCreators.postWrestlerRequest());
			return api.wrestlers.post(newWrestler).then((postedWrestler) => {
				const asyncActionCreators = createFetchActionCreators(api);
				dispatch(actionCreators.postWrestlerSuccess(postedWrestler));
				dispatch(asyncActionCreators.fetchMoves());
				dispatch(asyncActionCreators.fetchWrestlers());
			}, (error) => {
				dispatch(actionCreators.postWrestlerFailure(error));
			});
		}, (error) => {});
	},

	updateWrestler: (wrestler) => (dispatch) => {
		const onPostMoveSuccess = (move) => {
			dispatch(actionCreators.postMoveSuccess(move));
			return move;
		};
		const onPostMoveFailure = (error) => {
			dispatch(actionCreators.postMoveFailure(error));
			return Promise.reject(error);
		};
		const onPutMoveSuccess = (move) => {
			dispatch(actionCreators.putMoveSuccess(move));
			return move;
		};
		const onPutMoveFailure = (error) => {
			dispatch(actionCreators.putMoveFailure(error));
			return Promise.reject(error);
		};
		const getMovePromise = (move) => {
			if (_.isString(move.id)) {
				dispatch(actionCreators.postMoveRequest());
				return api.moves.post(move).then(onPostMoveSuccess, onPostMoveFailure);
			} else {
				dispatch(actionCreators.putMoveRequest());
				return api.moves.put(move).then(onPutMoveSuccess, onPutMoveFailure);
			}
		};

		const movePromises = _.map([
			'bra',
			'dex',
			'str',
			'tec',
			'fin',
		], (stat) => {
			return Promise.all(_.map(wrestler.moves[stat], getMovePromise))
				.then((moves) => ({ [stat]: _.map(moves, 'id') }));
		});

		return Promise.all(movePromises).then((moves) => {
			const updatedWrestler = {
				...wrestler,
				moves: _.reduce(moves, (results, statMoves) => ({
					...results,
					...statMoves,
				}), {}),
			};
			dispatch(actionCreators.putWrestlerRequest());
			return api.wrestlers.put(updatedWrestler).then(() => {
				const asyncActionCreators = createFetchActionCreators(api);
				dispatch(actionCreators.putWrestlerSuccess(updatedWrestler));
				dispatch(asyncActionCreators.fetchMoves());
				dispatch(asyncActionCreators.fetchWrestlers());
			}, (error) => {
				dispatch(actionCreators.putWrestlerFailure(error));
			});
		}, (error) => {});
	},
});
