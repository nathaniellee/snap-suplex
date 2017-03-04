import _ from 'lodash';
import api from '../../utils/api';
import createAsyncActionCreators from '../fetch/createAsyncActionCreators';
import actionTypes from './actionTypes';

export default {
	addWrestler: (wrestler) => (dispatch) => {
		// This is actually more of an edit wrestler. Need to adjust.
		const braMovePostPromises = _.map(wrestler.moves.bra, (move) => {
			if (_.isString(move.id)) {
				return api.moves.post(move);
			}
			return Promise.resolve(move);
		});
		const braMovePostsDonePromise = Promise.all(braMovePostPromises).then((braMoves) => ({ bra: _.map(braMoves, 'id') }));

		const dexMovePostPromises = _.map(wrestler.moves.dex, (move) => {
			if (_.isString(move.id)) {
				return api.moves.post(move);
			}
			return Promise.resolve(move);
		});
		const dexMovePostsDonePromise = Promise.all(dexMovePostPromises).then((dexMoves) => ({ dex: _.map(dexMoves, 'id') }));

		const strMovePostPromises = _.map(wrestler.moves.str, (move) => {
			if (_.isString(move.id)) {
				return api.moves.post(move);
			}
			return Promise.resolve(move);
		});
		const strMovePostsDonePromise = Promise.all(strMovePostPromises).then((strMoves) => ({ str: _.map(strMoves, 'id') }));

		const tecMovePostPromises = _.map(wrestler.moves.tec, (move) => {
			if (_.isString(move.id)) {
				return api.moves.post(move);
			}
			return Promise.resolve(move);
		});
		const tecMovePostsDonePromise = Promise.all(tecMovePostPromises).then((tecMoves) => ({ tec: _.map(tecMoves, 'id') }));

		const finisherPostPromises = _.map(wrestler.moves.fin, (move) => {
			if (_.isString(move.id)) {
				return api.moves.post(move);
			}
			return Promise.resolve(move);
		});
		const finisherPostsDonePromise = Promise.all(finisherPostPromises).then((finishers) => ({ fin: _.map(finishers, 'id') }));

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

	updateWrestler: (wrestler) => ({
		type: actionTypes.UPDATE_WRESTLER,
		wrestler,
	}),
};
