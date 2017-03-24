import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import { defaultStrategy } from '../../constants/defaults';
import initialState from '../../constants/initialMatchState';
import {
  getHealthLevel,
  getInitialHealth,
  getInitiative,
  getPinAttemptResults,
  getSubmissionAttemptResults,
  getToHitModifier,
  getToHitResults,
  roll,
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

    case actionTypes.RESET_MATCH: {
      return {
        ...initialState,
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
        defenderSucceeded,
      } = getToHitResults({
        attackerStat: attacker.stats[attackerStat],
        attackerToHitModifier,
        defenderStat: defender.stats[defenderStat],
        defenderToHitModifier,
      });

      const winner = attackerWon ? attacker : defender;
      const loser = attackerWon ? defender : attacker;
      const loserSucceeded = attackerWon ? defenderSucceeded : false;

      const roundWinnerId = winner.id;
      const roundLoserId = loser.id;

      const winningStrats = strategies[roundWinnerId];
      const winningLevel = winningStrats.level;
      const winningFlag = winningStrats.flag;

      let winnerHealth = winner.health;
      let loserHealth = loser.health;
      let damage = winningLevel;
      let shouldAttemptPin = false;
      let shouldAttemptSubmission = false;

      switch (winningFlag) {
        case 'stiff': {
          damage += 1;
          if (roll(5)) {
            winnerHealth -= 1;
          }
          break;
        }

        case 'highrisk': {
          damage += 2;
          break;
        }

        case 'illegal': {
          damage += 1;
          break;
        }

        case 'pinning': {
          damage -= 1;
          shouldAttemptPin = true;
          break;
        }

        case 'submission': {
          damage -= 1;
          shouldAttemptSubmission = true;
          break;
        }

        default: {}
      }

      // If the round loser attempted a high risk move and missed, they suffer the consequences.
      const losingStrats = strategies[roundLoserId];
      const losingLevel = losingStrats.level;
      const losingFlag = losingStrats.flag;
      if (losingFlag === 'highrisk' && !loserSucceeded) {
        damage += losingLevel;
      }

      loserHealth -= damage;
      if (loserHealth <= 15 && !loserSucceeded && winningFlag !== 'submission') {
        shouldAttemptPin = true;
      }

      let numPinAttemptFailures = null;
      let numSubmissionCycles = null;
      let disqualified = false;
      let pinned = false;
      let submitted = false;

      if (shouldAttemptPin) {
        let numPinAttempts = 3;
        numPinAttemptFailures = 0;

        if (winningFlag === 'pinning') {
          numPinAttempts = 2;
          numPinAttemptFailures = 1;
        }

        // Account for finisher when we incorporate finishers.

        numPinAttemptFailures += getPinAttemptResults(loserHealth, numPinAttempts);
        if (numPinAttemptFailures === 3) {
          pinned = true;
        }
      } else if (shouldAttemptSubmission) {
        const escapeRating = 10 - winner.stats.tec;
        const submissionDamage = winningLevel - 1;
        numSubmissionCycles = 0;

        const submissionCycle = () => {
          const escaped = roll(escapeRating);
          if (escaped) {
            return;
          }

          // The victim takes damage every time they fail to escape the submission hold except in
          // the case of the initial failure since damage plus bonuses was already inflicted.
          if (numSubmissionCycles > 0) {
            loserHealth -= submissionDamage;
            damage += submissionDamage;
          }

          const numResistSubmissionFailures = getSubmissionAttemptResults(loserHealth);
          if (numResistSubmissionFailures === 3) {
            submitted = true;
            return;
          }

          numSubmissionCycles += 1;
          submissionCycle();
        };

        submissionCycle();
      }

      // TODO: Decide if full strategies should be included in the results for logging purposes.
      const roundResults = {
        winnerId: roundWinnerId,
        loserId: roundLoserId,
        damage,
        roundNumber,
        stat: winningStrats.stat,
        level: winningLevel,
        numFavorites: winningStrats.numFavorites,
        flag: winningFlag,
        targetStat: winningStrats.targetStat,
        disqualified,
        pinAttempt: shouldAttemptPin
          ? {
            count: numPinAttemptFailures,
            pinned,
          }
          : null,
        submissionAttempt: shouldAttemptSubmission
          ? {
            cycles: numSubmissionCycles,
            submitted,
          }
          : null,
      };

      return {
        ...state,
        attackerId: roundWinnerId,
        defenderId: roundLoserId,
        roundNumber: roundNumber + 1,
        rounds: [
          ...rounds,
          roundResults,
        ],
        winnerId: pinned || submitted ? roundWinnerId : null,
        wrestlers: {
          ...wrestlers,
          [roundLoserId]: {
            ...loser,
            health: loserHealth,
          },
          [roundWinnerId]: {
            ...winner,
            health: winnerHealth,
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
