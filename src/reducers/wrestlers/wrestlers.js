import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';

const getMaxId = (wrestlers) => _(wrestlers)
	.map('id')
	.max();

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

		default: {
			return state;
		}
	}
};

export default wrestlers;
export const get = _.identity;
