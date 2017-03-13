import _ from 'lodash';
import actionTypes from '../actions/actionTypes';
import match, { selectors as matchSelectors } from './match/match';
import matchSetup, { selectors as matchSetupSelectors } from './matchSetup/matchSetup';
import moves, { selectors as movesSelectors } from './moves/moves';
import wrestlers, { selectors as wrestlersSelectors } from './wrestlers/wrestlers';
import reducer, { selectors } from './root';

const mockWrestler = {
  id: 3,
  name: 'Gillberg',
  stats: {
    bra: 1,
    dex: 1,
    sta: 1,
    str: 1,
    tec: 1,
  },
  moves: {
    bra: [],
    dex: [],
    str: [],
    tec: [],
    fin: [],
  },
};
const setWrestlersAction = {
  type: actionTypes.SET_WRESTLERS,
  wrestlers: [mockWrestler],
};

describe('root', () => {
  describe('reducer', () => {
    let action;
    let state;

    beforeEach(() => {
      state = reducer(undefined, {});
    });

    test('combines the appropriate reducers.', () => {
      expect(_.xor([
        'match',
        'matchSetup',
        'moves',
        'wrestlers',
      ], _.keys(state))).toHaveLength(0);

      // Compare results from an action that the `match` reducer handles.
      action = { type: actionTypes.START_MATCH };
      state = reducer(state, action);
      expect(state.match).toEqual(match(state.match, action));

      // Compare results from an action that the `matchSetup` reducer handles.
      action = {
        type: actionTypes.SET_MAX_ROUNDS,
        maxRounds: 10,
      };
      state = reducer(state, action);
      expect(state.matchSetup).toEqual(matchSetup(state.matchSetup, action));

      // Compare results from an action that the `wrestlers` reducer handles.
      state = reducer(state, setWrestlersAction);
      expect(state.wrestlers).toEqual(wrestlers(state.wrestlers, setWrestlersAction));
    });
  });

  describe('selectors', () => {
    let state;

    beforeEach(() => {
      state = reducer(undefined, {});
    });

    describe('get', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.get(state)).toEqual(state);
      });
    });

    describe('match', () => {
      describe('getMatch', () => {
        test('returns the appropriate state.', () => {
          expect(selectors.getMatch(state)).toEqual(matchSelectors.get(state.match));
        });
      });
    });

    describe('match setup', () => {
      describe('getMatchSetup', () => {
        test('returns the appropriate state.', () => {
          expect(selectors.getMatchSetup(state)).toEqual(matchSetupSelectors.get(state.matchSetup));
        });
      });

      describe('getMaxRounds', () => {
        test('returns the appropriate state.', () => {
          expect(selectors.getMaxRounds(state)).toEqual(matchSetupSelectors.getMaxRounds(state.matchSetup));
        });
      });

      describe('getStrategies', () => {
        test('returns the appropriate state.', () => {
          expect(selectors.getStrategies(state)).toEqual(matchSetupSelectors.getStrategies(state.matchSetup));
        });
      });

      describe('getStrategyByWrestlerId', () => {
        test('returns the appropriate state.', () => {
          expect(selectors.getStrategyByWrestlerId(state, 1)).toEqual(matchSetupSelectors.getStrategyByWrestlerId(state.matchSetup, 1));
        });
      });
    });

    describe('moves', () => {
      describe('getMove', () => {
        test('returns the appropriate state.', () => {
          expect(selectors.getMove(state, 0))
            .toEqual(movesSelectors.getMove(state.moves, 0));
        });
      });

      describe('getMoveIds', () => {
        test('returns the appropriate state.', () => {
          expect(selectors.getMoveIds(state))
            .toEqual(movesSelectors.getMoveIds(state.moves));
        });
      });

      describe('getMovesAsArray', () => {
        test('returns the appropriate state.', () => {
          expect(selectors.getMovesAsArray(state))
            .toEqual(movesSelectors.getMovesAsArray(state.moves));
        });
      });

      describe('getMovesAsMap', () => {
        test('returns the appropriate state.', () => {
          expect(selectors.getMovesAsMap(state))
            .toEqual(movesSelectors.getMovesAsMap(state.moves));
        });
      });
    });

    describe('wrestlers', () => {
      describe('getWrestler', () => {
        test('returns the appropriate state.', () => {
          expect(selectors.getWrestler(state, 0))
            .toEqual({ wrestler: null });
          expect(selectors.getWrestler(state, mockWrestler.id))
            .toEqual({ wrestler: wrestlersSelectors.getWrestler(state.wrestlers, mockWrestler.id) });
        });
      });

      describe('getWrestlerIds', () => {
        test('returns the appropriate state.', () => {
          expect(selectors.getWrestlerIds(state))
            .toEqual(wrestlersSelectors.getWrestlerIds(state.wrestlers));
        });
      });

      describe('getWrestlersAsArray', () => {
        test('returns the appropriate state.', () => {
          expect(selectors.getWrestlersAsArray(state))
            .toEqual(wrestlersSelectors.getWrestlersAsArray(state.wrestlers));
        });
      });

      describe('getWrestlersAsMap', () => {
        test('returns the appropriate state.', () => {
          expect(selectors.getWrestlersAsMap(state))
            .toEqual(wrestlersSelectors.getWrestlersAsMap(state.wrestlers));
        });
      });
    });
  });
});
