import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';

const getMaxId = (moves) => _(moves).map('id').max() || 0;

const defaultState = {
	byId: {},
	allIds: [],
};

export default (state = defaultState, action = {}) => {
	switch (action.type) {
		case actionTypes.ADD_MOVE: {
			const nextId = getMaxId(state.byId) + 1;
			return {
				byId: {
					...state.byId,
					[nextId]: {
						...action.move,
						id: nextId,
					},
				},
				allIds: [
					...state.allIds,
					nextId,
				],
			};
		}

		case actionTypes.SET_MOVES:
		case actionTypes.FETCH_MOVES_SUCCESS: {
			return action.moves;
		}

		case actionTypes.UPDATE_MOVE: {
      const { move } = action;
      const { id } = move;

      if (_.includes(state.allIds, id)) {
        return {
          ...state,
          byId: {
            ...state.byId,
            [id]: move,
          },
        };
      }

      return state;
    }

		default: {
			return state;
		}
	}
};

export const selectors = {
	getMove: (state, id) => _.get(state.byId, id, null),
	getMoveIds: (state) => state.allIds,
	getMovesAsArray: (state) => _.map(state.byId, _.identity),
	getMovesAsMap: (state) => state.byId,
};
