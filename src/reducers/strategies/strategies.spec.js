import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import reducer, { selectors } from './strategies';

const { FETCH_STRATEGIES_SUCCESS } = actionTypes;

describe('strategies', () => {
  let state;
  let fetchStrategiesAction;
  let unrecognizedAction;

  beforeEach(() => {
    state = reducer(undefined, {});
    fetchStrategiesAction = {
      type: FETCH_STRATEGIES_SUCCESS,
      strategies: {
        byId: {
          1: { id: 1 },
          2: { id: 2 },
        },
        allIds: [1, 2],
      },
    };
    unrecognizedAction = { type: 'unrecognized action' };
  });

  describe('reducers', () => {
    describe(`"${FETCH_STRATEGIES_SUCCESS}" action`, () => {
      test('replaces state with the new strategies.', () => {
        expect(state).toEqual({
          byId: {},
          allIds: [],
        });
        expect(reducer(state, fetchStrategiesAction)).toEqual({
          byId: {
            1: { id: 1 },
            2: { id: 2 },
          },
          allIds: [1, 2],
        });
      });
    });

    describe('unrecognized action', () => {
      test('returns current state.', () => {
        expect(state).toEqual({
          byId: {},
          allIds: [],
        });
        state = reducer(state, fetchStrategiesAction);
        expect(reducer(state, unrecognizedAction)).toEqual({
          byId: {
            1: { id: 1 },
            2: { id: 2 },
          },
          allIds: [1, 2],
        });
      });
    });
  });

  describe('selectors', () => {
    beforeEach(() => {
      state = reducer(state, fetchStrategiesAction);
    });

    describe('getStrategy', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getStrategy(state, 1)).toEqual({ id: 1 });
      });
    });

    describe('getStrategyIds', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getStrategyIds(state)).toEqual([1, 2]);
      });
    });

    describe('getStrategiesAsArray', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getStrategiesAsArray(state)).toEqual([
          { id: 1 },
          { id: 2 },
        ]);
      });
    });

    describe('getStrategiesAsMap', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getStrategiesAsMap(state)).toEqual({
          1: { id: 1 },
          2: { id: 2 },
        });
      });
    });
  });
});

