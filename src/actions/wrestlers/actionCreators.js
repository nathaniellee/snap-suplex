import _ from 'lodash';
import api from '../../utils/api';
import createAsyncActionCreators from '../fetch/createAsyncActionCreators';
import actionTypes from './actionTypes';

export default {
	addWrestler: (wrestler) => (dispatch) => {
		const braMovePostPromises = _.map(wrestler.moves.bra, (move) => {
			return api.moves.post(move);
		});
		const braMovePostsDonePromise = Promise.all(braMovePostPromises)
			.then((braMoves) => ({ bra: _.map(braMoves, 'id') }));

		const dexMovePostPromises = _.map(wrestler.moves.dex, (move) => {
			return api.moves.post(move);
		});
		const dexMovePostsDonePromise = Promise.all(dexMovePostPromises)
			.then((dexMoves) => ({ dex: _.map(dexMoves, 'id') }));

		const strMovePostPromises = _.map(wrestler.moves.str, (move) => {
			return api.moves.post(move);
		});
		const strMovePostsDonePromise = Promise.all(strMovePostPromises)
			.then((strMoves) => ({ str: _.map(strMoves, 'id') }));

		const tecMovePostPromises = _.map(wrestler.moves.tec, (move) => {
			return api.moves.post(move);
		});
		const tecMovePostsDonePromise = Promise.all(tecMovePostPromises)
			.then((tecMoves) => ({ tec: _.map(tecMoves, 'id') }));

		const finisherPostPromises = _.map(wrestler.moves.fin, (move) => {
			return api.moves.post(move);
		});
		const finisherPostsDonePromise = Promise.all(finisherPostPromises)
			.then((finishers) => ({ fin: _.map(finishers, 'id') }));

		Promise.all([
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
			api.wrestlers.post(newWrestler).then(() => {
				const asyncActionCreators = createAsyncActionCreators(api);
				dispatch(asyncActionCreators.fetchMoves());
				dispatch(asyncActionCreators.fetchWrestlers());
			});
		});
	},

	setWrestlers: (wrestlers) => ({
		type: actionTypes.SET_WRESTLERS,
		wrestlers,
	}),

	updateWrestler: (wrestler) => (dispatch) => {
		// This is actually more of an edit wrestler. Need to adjust.
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

		Promise.all([
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
			api.wrestlers.put(updatedWrestler).then(() => {
				const asyncActionCreators = createAsyncActionCreators(api);
				dispatch(asyncActionCreators.fetchMoves());
				dispatch(asyncActionCreators.fetchWrestlers());
			});
		});
	},
};
