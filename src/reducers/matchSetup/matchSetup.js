import _ from 'lodash';
import { combineReducers } from 'redux';
import actionTypes from '../../actions/actionTypes';
import rounds, { selectors as roundsSelectors } from './rounds/rounds';

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

const wrestlers = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.ADD_WRESTLER_TO_MATCH: {
      return [
        ...state,
        action.wrestlerId,
      ];
    }

    case actionTypes.REMOVE_WRESTLER_FROM_MATCH: {
      return _.without(state, action.wrestlerId);
    }

    default: {
      return state;
    }
  }
};

export default combineReducers({
  dqRating,
  pageIndex,
  refScore,
  rounds,
  wrestlers,
});

export const selectors = {
  get: _.identity,
  getMaxRounds: (state) => roundsSelectors.getMaxRounds(state.rounds),
  getStrategies: (state) => roundsSelectors.getStrategies(state.rounds),
  getStrategyByWrestlerId: (state, wrestlerId) =>
    roundsSelectors.getStrategyByWrestlerId(state.rounds, wrestlerId),
};
