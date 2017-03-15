import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import {
  defaultDqRating,
  defaultNumRounds,
  defaultRefScore,
} from '../../constants/defaults';

const initialState = {
  dqRating: defaultDqRating,
  numRounds: defaultNumRounds,
  pageIndex: 0,
  refScore: defaultRefScore,
  roundNumber: null,
  rounds: [],
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
      return {
        ...state,
        numRounds,
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
      return {
        ...state,
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
        wrestlers: _.without(state.wrestlers, wrestlerId),
      };
    }

    case actionTypes.START_MATCH: {
      return {
        ...state,
        roundNumber: 1,
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
