import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import { defaultStrategy } from '../../constants/defaults';
import initialState from '../../constants/initialMatchState';
import {
  getHealthLevel,
  getInitialHealth,
  getInitiative,
  getToHitModifier,
  getToHitResults,
} from '../../utils/match';

const getDefaultStrategies = (wrestlers) => _.reduce(wrestlers, (results, wrestler, id) => ({
  ...results,
  [id]: {
    ...defaultStrategy,
  },
}), {});

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

    case actionTypes.SET_STRATEGIES: {
      const { strategies } = action;
      return {
        ...state,
        strategies,
      };
    }

    case actionTypes.ADD_WRESTLER_TO_MATCH: {
      const { wrestlers } = state;

      if (_.size(wrestlers) >= 2) {
        return state;
      }

      const wrestler = _.cloneDeep(action.wrestler);
      return {
        ...state,
        wrestlers: {
          ...wrestlers,
          [wrestler.id]: wrestler,
        },
      };
    }

    case actionTypes.REMOVE_WRESTLER_FROM_MATCH: {
      const { wrestlerId } = action;
      return {
        ...state,
        wrestlers: _.omit(state.wrestlers, wrestlerId),
      };
    }

    case actionTypes.START_MATCH: {
      const { wrestlers } = state;

      if (_.size(wrestlers) < 2) {
        return state;
      }

      const {
        winnerId: attackerId,
        loserId: defenderId,
      } = getInitiative(wrestlers);
      return {
        ...state,
        attackerId,
        defenderId,
        roundNumber: 1,
        strategies: getDefaultStrategies(wrestlers),
        wrestlers: _.reduce(wrestlers, (results, wrestler, wrestlerId) => ({
          ...results,
          [wrestlerId]: {
            ...wrestler,
            health: getInitialHealth(wrestler.stats.sta),
          },
        }), {}),
      };
    }

    case actionTypes.RESOLVE_CURRENT_ROUND: {
      const {
        attackerId,
        defenderId,
        roundNumber,
        rounds,
        strategies,
        wrestlers,
      } = state;

      const attacker = _.get(wrestlers, attackerId);
      const defender = _.get(wrestlers, defenderId);

      const attackerHealthLevel = getHealthLevel(attacker.stats.sta, attacker.health);
      const defenderHealthLevel = getHealthLevel(defender.stats.sta, defender.health);

      const attackerRoundLevel = strategies[attackerId].level;
      const defenderRoundLevel = strategies[defenderId].level;

      const attackerToHitModifier = getToHitModifier(defenderHealthLevel, attackerRoundLevel);
      const defenderToHitModifier = getToHitModifier(attackerHealthLevel, defenderRoundLevel);

      const attackerStat = strategies[attackerId].stat;
      const defenderStat = strategies[defenderId].stat;

      const {
        attackerWon,
        attackerSucceeded,
        defenderSucceeded,
      } = getToHitResults({
        attackerStat: attacker.stats[attackerStat],
        attackerToHitModifier,
        defenderStat: defender.stats[defenderStat],
        defenderToHitModifier,
      });

      const winner = attackerWon ? attacker : defender;
      const loser = attackerWon ? defender : attacker;

      const winnerId = winner.id;
      const loserId = loser.id;

      const winningStrats = strategies[winnerId];
      const winningStat = winningStrats.stat;
      const winningLevel = winningStrats.level;
      const winningNumFavorites = winningStrats.numFavorites;
      const winningFlag = winningStrats.flag;
      const winningTargetStat = winningStrats.targetStat;

      const damage = winningLevel;
      const loserHealth = loser.health - damage;

      const attemptPin = winningFlag === 'pinning' || loserHealth <= 15;
      const attemptSubmission = winningFlag === 'submission';

      const roundResults = {
        winnerId,
        loserId,
        damage,
        roundNumber,
        targetStat: winningTargetStat,
        attemptPin,
        attemptSubmission,
      };

      return {
        ...state,
        attackerId: winnerId,
        defenderId: loserId,
        roundNumber: roundNumber + 1,
        rounds: [
          ...rounds,
          roundResults,
        ],
        // strategies: getDefaultStrategies(wrestlers),
        wrestlers: {
          ...wrestlers,
          [loserId]: {
            ...loser,
            health: loserHealth,
          },
        },
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
