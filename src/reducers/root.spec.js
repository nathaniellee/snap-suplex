import _ from 'lodash';
import actionTypes from '../actions/actionTypes';
import match, { selectors as matchSelectors } from './match/match';
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

  describe('wrestlers', () => {
    describe('getWrestler', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getWrestler(initialState, 0))
          .toEqual(wrestlersSelectors.getWrestler(initialState.wrestlers, 0));
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
