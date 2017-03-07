import _ from 'lodash';
import actionCreators from './actionCreators';
import createFetchActionCreators from '../fetch/createAsyncActionCreators';

export default (api) => ({
	addWrestler: (wrestler) => (dispatch) => {
		const onPostMoveSuccess = (postedMove) => {
			dispatch(actionCreators.postMoveSuccess(postedMove));
			return postedMove;
		};
		const onPostMoveFailure = (error) => {
			dispatch(actionCreators.postMoveFailure(error));
			return Promise.reject(error);
		};

		const braMovePostPromises = _.map(wrestler.moves.bra, (move) => {
			dispatch(actionCreators.postMoveRequest());
			return api.moves.post(move).then(onPostMoveSuccess, onPostMoveFailure);
		});
		const braMovePostsDonePromise = Promise.all(braMovePostPromises)
			.then((braMoves) => ({ bra: _.map(braMoves, 'id') }));

		const dexMovePostPromises = _.map(wrestler.moves.dex, (move) => {
			dispatch(actionCreators.postMoveRequest());
			return api.moves.post(move).then(onPostMoveSuccess, onPostMoveFailure);
		});
		const dexMovePostsDonePromise = Promise.all(dexMovePostPromises)
			.then((dexMoves) => ({ dex: _.map(dexMoves, 'id') }));

		const strMovePostPromises = _.map(wrestler.moves.str, (move) => {
			dispatch(actionCreators.postMoveRequest());
			return api.moves.post(move).then(onPostMoveSuccess, onPostMoveFailure);
		});
		const strMovePostsDonePromise = Promise.all(strMovePostPromises)
			.then((strMoves) => ({ str: _.map(strMoves, 'id') }));

		const tecMovePostPromises = _.map(wrestler.moves.tec, (move) => {
			dispatch(actionCreators.postMoveRequest());
			return api.moves.post(move).then(onPostMoveSuccess, onPostMoveFailure);
		});
		const tecMovePostsDonePromise = Promise.all(tecMovePostPromises)
			.then((tecMoves) => ({ tec: _.map(tecMoves, 'id') }));

		const finisherPostPromises = _.map(wrestler.moves.fin, (move) => {
			dispatch(actionCreators.postMoveRequest());
			return api.moves.post(move).then(onPostMoveSuccess, onPostMoveFailure);
		});
		const finisherPostsDonePromise = Promise.all(finisherPostPromises)
			.then((finishers) => ({ fin: _.map(finishers, 'id') }));

		return Promise.all([
			braMovePostsDonePromise,
			dexMovePostsDonePromise,
			strMovePostsDonePromise,
			tecMovePostsDonePromise,
			finisherPostsDonePromise,
		]).then((moves) => {
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
		const braMovePostPromises = _.map(wrestler.moves.bra, (move) => _.isString(move.id)
			? api.moves.post(move)
			: api.moves.put(move));
		const braMovePostsDonePromise = Promise.all(braMovePostPromises)
			.then((braMoves) => ({ bra: _.map(braMoves, 'id') }));

		const dexMovePostPromises = _.map(wrestler.moves.dex, (move) => _.isString(move.id)
			? api.moves.post(move)
			: api.moves.put(move));
		const dexMovePostsDonePromise = Promise.all(dexMovePostPromises)
			.then((dexMoves) => ({ dex: _.map(dexMoves, 'id') }));

		const strMovePostPromises = _.map(wrestler.moves.str, (move) => _.isString(move.id)
			? api.moves.post(move)
			: api.moves.put(move));
		const strMovePostsDonePromise = Promise.all(strMovePostPromises)
			.then((strMoves) => ({ str: _.map(strMoves, 'id') }));

		const tecMovePostPromises = _.map(wrestler.moves.tec, (move) => _.isString(move.id)
			? api.moves.post(move)
			: api.moves.put(move));
		const tecMovePostsDonePromise = Promise.all(tecMovePostPromises)
			.then((tecMoves) => ({ tec: _.map(tecMoves, 'id') }));

		const finisherPostPromises = _.map(wrestler.moves.fin, (move) => _.isString(move.id)
			? api.moves.post(move)
			: api.moves.put(move));
		const finisherPostsDonePromise = Promise.all(finisherPostPromises)
			.then((finishers) => ({ fin: _.map(finishers, 'id') }));

		return Promise.all([
			braMovePostsDonePromise,
			dexMovePostsDonePromise,
			strMovePostsDonePromise,
			tecMovePostsDonePromise,
			finisherPostsDonePromise,
		]).then((moves) => {
			const updatedWrestler = {
				...wrestler,
				moves: _.reduce(moves, (results, statMoves) => ({
					...results,
					...statMoves,
				}), {}),
			};
			return api.wrestlers.put(updatedWrestler).then(() => {
				const asyncActionCreators = createFetchActionCreators(api);
				dispatch(asyncActionCreators.fetchMoves());
				dispatch(asyncActionCreators.fetchWrestlers());
			});
		});
	},
});
