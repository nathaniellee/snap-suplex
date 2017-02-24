import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';

const getMaxId = (wrestlers) => _(wrestlers).map('id').max() || 0;

const reducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_WRESTLER: {
      const nextId = getMaxId(state) + 1;
      return {
        ...state,
        [nextId]: {
          ...action.wrestler,
          id: nextId,
        },
      };
    }

    case actionTypes.SET_WRESTLERS: {
      return _.keyBy(action.wrestlers, 'id');
    }

    default: {
      return state;
    }
  }
};

export default reducer;
export const selectors = {
  getWrestler: (state, id) => _.get(state, id, null),
  getWrestlersAsArray: (state) => _.map(state, _.identity),
  getWrestlersAsMap: _.identity,
};
