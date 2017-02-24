import _ from 'lodash';
import actionTypes from '../actions/actionTypes';
import match, * as fromMatch from './match/match';
import wrestlers, { selectors as wrestlersSelectors } from './wrestlers/wrestlers';
import reducer, { selectors } from './root';

const setWrestlersAction = {
  type: actionTypes.SET_WRESTLERS,
  wrestlers: [
    {
      id: 2,
      name: 'Andre the Giant',
    },
  ],
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

  describe('match', () => {
    const {
      getMaxRounds,
      getRoundNumber,
      getWrestlers,
    } = selectors.match;

    describe('getMaxRounds', () => {
      test('returns the appropriate state.', () => {
        expect(getMaxRounds(initialState)).toEqual(fromMatch.getMaxRounds(initialState.match));
      });
    });

    describe('getRoundNumber', () => {
      test('returns the appropriate state.', () => {
        expect(getRoundNumber(initialState)).toEqual(fromMatch.getRoundNumber(initialState.match));
      });
    });

    describe('getWrestlers', () => {
      test('returns the appropriate state.', () => {
        expect(getWrestlers(initialState)).toEqual(fromMatch.getWrestlers(initialState.match));
      });
    });
  });

  describe('wrestlers', () => {
    const {
      getWrestler,
      getWrestlersAsArray,
      getWrestlersAsMap,
    } = selectors.wrestlers;

    describe('getWrestler', () => {
      test('returns the appropriate state.', () => {
        expect(getWrestler(initialState, 0)).toEqual(wrestlersSelectors.getWrestler(initialState.wrestlers, 0));
      });
    });

    describe('getWrestlersAsArray', () => {
      test('returns the appropriate state.', () => {
        expect(getWrestlersAsArray(initialState)).toEqual(wrestlersSelectors.getWrestlersAsArray(initialState.wrestlers));
      });
    });

    describe('getWrestlersAsMap', () => {
      test('returns the appropriate state.', () => {
        expect(getWrestlersAsMap(initialState)).toEqual(wrestlersSelectors.getWrestlersAsMap(initialState.wrestlers));
      });
    });
  });

  describe('get', () => {
    test('returns the appropriate state.', () => {
      expect(selectors.get(initialState)).toEqual(initialState);
    });
  });
});
