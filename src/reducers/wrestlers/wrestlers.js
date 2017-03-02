import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';

const getMaxId = (wrestlers) => _(wrestlers).map('id').max() || 0;

const defaultState = {
  byId: {},
  allIds: [],
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case actionTypes.ADD_WRESTLER: {
      const nextId = getMaxId(state.byId) + 1;
      return {
        byId: {
          ...state.byId,
          [nextId]: {
            ...action.wrestler,
            id: nextId,
          },
        },
        allIds: [
          ...state.allIds,
          nextId,
        ],
      };
    }

    case actionTypes.SET_WRESTLERS:
    case actionTypes.FETCH_WRESTLERS_SUCCESS: {
      return {
        byId: _.keyBy(action.wrestlers, 'id'),
        allIds: _.map(action.wrestlers, 'id'),
      };
    }

    case actionTypes.UPDATE_WRESTLER: {
      const { wrestler } = action;
      const { id } = wrestler;

      if (_.includes(state.allIds, id)) {
        return {
          ...state,
          byId: {
            ...state.byId,
            [id]: wrestler,
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
  getWrestler: (state, id) => _.get(state.byId, id, null),
  getWrestlerIds: (state) => state.allIds,
  getWrestlersAsArray: (state) => _.map(state.byId, _.identity),
  getWrestlersAsMap: (state) => state.byId,
};
