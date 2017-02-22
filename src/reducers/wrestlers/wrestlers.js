import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';

const getMaxId = (wrestlers) => _(wrestlers)
	.map('id')
	.max() || 0;

const wrestlers = (state = [], action) => {
	switch (action.type) {
		case actionTypes.ADD_WRESTLER: {
			const nextId = getMaxId(state) + 1;
			return [
				...state,
				{
					...action.wrestler,
					id: nextId,
				},
			];
		}

		case actionTypes.SET_WRESTLERS: {
			return [...action.wrestlers];
		}

		case actionTypes.FETCH_WRESTLERS_SUCCESS: {
			return [...action.wrestlers];
		}

		case actionTypes.FETCH_WRESTLERS_FAILURE: {
			return state;
		}

		default: {
			return state;
		}
	}
};

export default wrestlers;
export const get = _.identity;
