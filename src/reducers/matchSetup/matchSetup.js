import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import { defaultStrategy } from '../../constants/defaults';
import initialState from '../../constants/initialMatchState';
import {
  getInitialHealth,
  getInitiative,
  pinAttempt,
  submissionAttempt,
  getRoundWinnerLoser,
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

    case actionTypes.SET_WARNINGS: {
      const { warnings } = action;
      return {
        ...state,
        warnings,
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
        dqRating,
        refScore,
        roundNumber,
        rounds,
        strategies,
        wrestlers,
      } = state;

      const {
        roundWinner,
        roundLoser,
        roundLoserSucceeded,
      } = getRoundWinnerLoser({
        attackerId,
        defenderId,
        strategies,
        wrestlers,
      });

      const roundWinnerId = roundWinner.id;
      const roundLoserId = roundLoser.id;

      const winningStrats = strategies[roundWinnerId];
      const winningLevel = winningStrats.level;
      const winningFlag = winningStrats.flag;

      const losingStrats = strategies[roundLoserId];
      const losingLevel = losingStrats.level;
      const losingFlag = losingStrats.flag;

      let roundWinnerHealth = roundWinner.health;
      let roundLoserHealth = roundLoser.health;
      let damage = winningLevel;
      let warnings = state.warnings;
      let caughtCheating = false;
      let disqualified = false;
      let shouldAttemptPin = false;
      let shouldAttemptSubmission = false;
      let pinned = false;
      let submitted = false;

      switch (winningFlag) {
        case 'stiff': {
          damage += 1;
          if (roll(5)) {
            roundWinnerHealth -= 1;
          }
          break;
        }

        case 'highrisk': {
          damage += 2;
          break;
        }

        case 'illegal': {
          damage += 1;
          caughtCheating = !roll(refScore);
          if (caughtCheating) {
            warnings += winningLevel;
            if (warnings >= dqRating) {
              disqualified = true;
            }
          }
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
      if (losingFlag === 'highrisk' && !roundLoserSucceeded) {
        damage += losingLevel;
      }

      roundLoserHealth -= damage;
      if (roundLoserHealth <= 15 && !roundLoserSucceeded && winningFlag !== 'submission' && !disqualified) {
        shouldAttemptPin = true;
      }

      let numPinAttemptFailures = null;
      let numSubmissionCycles = null;

      if (!disqualified) {
        if (shouldAttemptPin) {
          let numPinAttempts = 3;
          numPinAttemptFailures = 0;

          if (winningFlag === 'pinning') {
            numPinAttempts = 2;
            numPinAttemptFailures = 1;
          }

          // Account for finisher when we incorporate finishers.

          numPinAttemptFailures += pinAttempt(roundLoserHealth, numPinAttempts);
          if (numPinAttemptFailures === 3) {
            pinned = true;
          }
        } else if (shouldAttemptSubmission) {
          const escapeRating = 10 - roundWinner.stats.tec;
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
              roundLoserHealth -= submissionDamage;
              damage += submissionDamage;
            }

            if (roundLoserHealth <= 20) {
              const numResistSubmissionFailures = submissionAttempt(roundLoserHealth);
              if (numResistSubmissionFailures === 3) {
                submitted = true;
                return;
              }
            }

            numSubmissionCycles += 1;
            submissionCycle();
          };

          submissionCycle();
        }
      }

      // TODO: Decide if full strategies should be included in the results for logging purposes.
      // TODO: Include data around illegal move being used.
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
        caughtCheating,
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

      let matchWinnerId = null;
      if (pinned || submitted) {
        matchWinnerId = roundWinnerId;
      } else if (disqualified) {
        matchWinnerId = roundLoserId;
      }

      return {
        ...state,
        attackerId: roundWinnerId,
        defenderId: roundLoserId,
        matchWinnerId,
        roundNumber: roundNumber + 1,
        rounds: [
          ...rounds,
          roundResults,
        ],
        warnings,
        wrestlers: {
          ...wrestlers,
          [roundLoserId]: {
            ...roundLoser,
            health: roundLoserHealth,
          },
          [roundWinnerId]: {
            ...roundWinner,
            health: roundWinnerHealth,
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
