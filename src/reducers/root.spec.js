import _ from 'lodash';
import actionTypes from '../actions/actionTypes';
import match, { selectors as matchSelectors } from './match/match';
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

describe('root reducer', () => {
  let action;
  let initialState;
  let updatedState;

  beforeEach(() => {
    initialState = reducer(undefined, {});
  });

  test('combines the appropriate reducers.', () => {
    expect(_.xor([
      'match',
      'moves',
      'wrestlers',
    ], _.keys(initialState))).toHaveLength(0);

    // Compare results from an action that the `match` reducer handles.
    action = {
      type: actionTypes.SET_MAX_ROUNDS,
      maxRounds: 10,
    };
    updatedState = reducer(initialState, action);
    expect(updatedState.match).toEqual(match(initialState.match, action));

    // Compare results from an action that the `wrestlers` reducer handles.
    updatedState = reducer(updatedState, setWrestlersAction);
    expect(updatedState.wrestlers).toEqual(wrestlers(updatedState.wrestlers, setWrestlersAction));
  });
});

describe('root selectors', () => {
  let initialState;

  beforeEach(() => {
    initialState = reducer(undefined, {});
  });

  describe('get', () => {
    test('returns the appropriate state.', () => {
      expect(selectors.get(initialState)).toEqual(initialState);
    });
  });

  describe('getMatch', () => {
    test('returns the appropriate state.', () => {
      expect(selectors.getMatch(initialState)).toEqual(matchSelectors.get(initialState.match));
    });
  });

  describe('moves', () => {
    describe('getMove', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getMove(initialState, 0))
          .toEqual(movesSelectors.getMove(initialState.moves, 0));
      });
    });

    describe('getMoveIds', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getMoveIds(initialState))
          .toEqual(movesSelectors.getMoveIds(initialState.moves));
      });
    });

    describe('getMovesAsArray', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getMovesAsArray(initialState))
          .toEqual(movesSelectors.getMovesAsArray(initialState.moves));
      });
    });

    describe('getMovesAsMap', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getMovesAsMap(initialState))
          .toEqual(movesSelectors.getMovesAsMap(initialState.moves));
      });
    });
  });

  describe('wrestlers', () => {
    describe('getWrestler', () => {
      test('returns the appropriate state.', () => {
        const updatedState = reducer(initialState, setWrestlersAction);
        expect(selectors.getWrestler(initialState, 0))
          .toEqual({ wrestler: null });
        expect(selectors.getWrestler(initialState, mockWrestler.id))
          .toEqual({ wrestler: wrestlersSelectors.getWrestler(initialState.wrestlers, mockWrestler.id) });
      });
    });

    describe('getWrestlerIds', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getWrestlerIds(initialState))
          .toEqual(wrestlersSelectors.getWrestlerIds(initialState.wrestlers));
      });
    });

    describe('getWrestlersAsArray', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getWrestlersAsArray(initialState))
          .toEqual(wrestlersSelectors.getWrestlersAsArray(initialState.wrestlers));
      });
    });

    describe('getWrestlersAsMap', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getWrestlersAsMap(initialState))
          .toEqual(wrestlersSelectors.getWrestlersAsMap(initialState.wrestlers));
      });
    });
  });
});
