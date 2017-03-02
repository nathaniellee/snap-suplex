import actionCreators from './actionCreators';

export default (api) => ({
	fetchMoves: () => (dispatch) => {
		dispatch(actionCreators.fetchMovesRequest());
		return api.moves.get().then((moves) => {
			dispatch(actionCreators.fetchMovesSuccess(moves));
		}, (error) => {
			dispatch(actionCreators.fetchMovesFailure(error));
		});
	},
	fetchWrestlers: () => (dispatch) => {
		dispatch(actionCreators.fetchWrestlersRequest());
		return api.wrestlers.get().then((wrestlers) => {
			dispatch(actionCreators.fetchWrestlersSuccess(wrestlers));
		}, (error) => {
			dispatch(actionCreators.fetchWrestlersFailure(error));
		});
	},
});
