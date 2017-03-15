import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import {
  defaultDqRating,
  defaultNumRounds,
  defaultRefScore,
  defaultStrategyId,
} from '../../constants/defaults';
import favoritesMap from '../../constants/favoritesMap';
import roundLevelMap from '../../constants/roundLevelMap';
import spotFlagsMap from '../../constants/spotFlagsMap';
import statMap from '../../constants/statMap';

const initialState = {
  dqRating: defaultDqRating,
  numRounds: defaultNumRounds,
  pageIndex: 0,
  refScore: defaultRefScore,
  strategies: {},
  wrestlers: [],
};

const getStrategyId = (strategy) => {
  const {
    flag,
    level,
    numFavorites,
    stat,
    targetStat,
  } = strategy;

  const statId = _.chain(statMap)
    .get('byId')
    .find({ value: stat })
    .get('id')
    .value();
  const levelId = _.chain(roundLevelMap)
    .get('byId')
    .find({ value: level })
    .get('id')
    .value();
  const favoritesId = _.chain(favoritesMap)
    .get('byId')
    .find({ value: numFavorites })
    .get('id')
    .value();
  const flagId = _.isNull(flag)
    ? 0
    : _.chain(spotFlagsMap)
      .get('byId')
      .find({ value: flag })
      .get('id')
      .value();
  const targetStatId = _.isNull(targetStat)
    ? 0
    : _.chain(statMap)
      .get('byId')
      .find({ value: targetStat })
      .get('id')
      .value();

  return (statId * 10000) +
    (levelId * 1000) +
    (favoritesId * 100) +
    (flagId * 10) +
    (targetStatId * 1);
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

    case actionTypes.SET_STRATEGIES: {
      const { strategies: strategiesById } = action;
      return {
        ...state,
        strategies: _.reduce(strategiesById, (results, strategies, wrestlerId) => ({
          ...results,
          [wrestlerId]: _.map(strategies, (strategy) => getStrategyId(strategy)),
        }), {}),
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
