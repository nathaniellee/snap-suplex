import _ from 'lodash';
import { combineReducers } from 'redux';
import actionTypes from '../../actions/actionTypes';

const dqRating = (state = 5, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_DQ_RATING: {
      return action.dqRating;
    }

    default: {
      return state;
    }
  }
};

const maxRounds = (state = 10, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_MAX_ROUNDS: {
      return action.maxRounds;
    }

    default: {
      return state;
    }
  }
};

const pageIndex = (state = 0, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_PAGE_INDEX: {
      return action.pageIndex;
    }

    default: {
      return state;
    }
  }
};

const refScore = (state = 5, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_REF_SCORE: {
      return action.refScore;
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
        action.wrestler.id,
      ]);
    }

    default: {
      return state;
    }
  }
};

export default combineReducers({
  dqRating,
  maxRounds,
  pageIndex,
  refScore,
  roundNumber,
  wrestlers,
});

export const selectors = {
  get: _.identity,
};
