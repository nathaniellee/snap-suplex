import actionCreators from './actionCreators';

export default (api) => ({
	fetchWrestlers: () => (dispatch) => {
		dispatch(actionCreators.fetchWrestlersRequest());
		return api.wrestlers.get().then((wrestlers) => {
			dispatch(actionCreators.fetchWrestlersSuccess(wrestlers));
		}, (error) => {
			dispatch(actionCreators.fetchWrestlersFailure(error));
		});
	},
});
