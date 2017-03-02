import _ from 'lodash';
import { combineReducers } from 'redux';
import actionTypes from '../../actions/actionTypes';

const maxRounds = (state = 1, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_MAX_ROUNDS: {
      return action.maxRounds;
    }

    default: {
      return state;
    }
  }
};

const roundNumber = (state = 1, action = {}) => {
  switch (action.type) {
    case actionTypes.INCREMENT_ROUND_NUMBER: {
      return state + 1;
    }

    case actionTypes.START_MATCH: {
      return 1;
    }

    default: {
      return state;
    }
  }
};

const wrestlers = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.ADD_WRESTLER_TO_MATCH: {
      return _.uniq([
        ...state,
        action.id,
      ]);
    }

    default: {
      return state;
    }
  }
};

export default combineReducers({
  maxRounds,
  roundNumber,
  wrestlers,
});

export const selectors = {
  get: _.identity,
};
