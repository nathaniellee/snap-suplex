import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import {
  defaultDqRating,
  defaultNumRounds,
  defaultRefScore,
  defaultStrategyId,
} from '../../constants/defaults';

const initialState = {
  dqRating: defaultDqRating,
  numRounds: defaultNumRounds,
  pageIndex: 0,
  refScore: defaultRefScore,
  strategies: {},
  wrestlers: [],
};

const match = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_DQ_RATING: {
      const { dqRating } = action;
      return {
        ...state,
        dqRating,
      };
    }

    case actionTypes.SET_NUM_ROUNDS: {
      const { numRounds } = action;
      const {
        numRounds: currentNumRounds,
        strategies,
      } = state;

      if (numRounds === currentNumRounds) {
        return state;
      }

      if (_.isEmpty(strategies)) {
        return {
          ...state,
          numRounds,
        };
      }

      if (numRounds < currentNumRounds) {
        return {
          ...state,
          numRounds,
          strategies: _.reduce(strategies, (results, rounds, wrestlerId) => ({
            ...results,
            [wrestlerId]: _.take(rounds, numRounds),
          }), {}),
        };
      }

      const difference = numRounds - currentNumRounds;
      return {
        ...state,
        numRounds,
        strategies: _.reduce(strategies, (results, rounds, wrestlerId) => ({
          ...results,
          [wrestlerId]: [
            ...rounds,
            ..._.fill(Array(difference), defaultStrategyId),
          ],
        }), {}),
      };
    }

    case actionTypes.SET_PAGE_INDEX: {
      const { pageIndex } = action;
      return {
        ...state,
        pageIndex,
      };
    }

    case actionTypes.SET_REF_SCORE: {
      const { refScore } = action;
      return {
        ...state,
        refScore,
      };
    }

    case actionTypes.ADD_WRESTLER_TO_MATCH: {
      const { wrestlerId } = action;
      const { numRounds } = state;
      return {
        ...state,
        strategies: {
          ...state.strategies,
          [wrestlerId]: _.fill(Array(numRounds), defaultStrategyId),
        },
        wrestlers: [
          ...state.wrestlers,
          wrestlerId,
        ],
      };
    }

    case actionTypes.REMOVE_WRESTLER_FROM_MATCH: {
      const { wrestlerId } = action;
      return {
        ...state,
        strategies: _.omit(state.strategies, wrestlerId),
        wrestlers: _.without(state.wrestlers, wrestlerId),
      };
    }

    default: {
      return state;
    }
  }
};

export default match;

export const selectors = {
  get: _.identity,
};
