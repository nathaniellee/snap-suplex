import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import reducer, { selectors } from './wrestlers';

const {
  ADD_WRESTLER,
  SET_WRESTLERS,
} = actionTypes;

describe('wrestlers', () => {
  let state;
  let addWrestlerAction;
  let setWrestlersAction;
  let unrecognizedAction;

  beforeEach(() => {
    state = reducer(undefined, {});
    addWrestlerAction = {
      type: ADD_WRESTLER,
      wrestler: { name: 'The Heartbreak Kid Shawn Michaels' },
    };
    setWrestlersAction = {
      type: SET_WRESTLERS,
      wrestlers: [
        {
          id: 1,
          name: 'Stone Cold Steve Austin',
        },
        {
          id: 2,
          name: 'The Rock',
        },
      ],
    };
    unrecognizedAction = { type: 'unrecognized action' };
  });

  describe('reducers', () => {
    describe(`"${SET_WRESTLERS}" action`, () => {
      test('replaces state with the new wrestlers.', () => {
        expect(state).toEqual({
          byId: {},
          allIds: [],
        });
        expect(reducer(state, setWrestlersAction)).toEqual({
          byId: {
            1: {
              id: 1,
              name: 'Stone Cold Steve Austin',
            },
            2: {
              id: 2,
              name: 'The Rock',
            },
          },
          allIds: [1, 2],
        });
      });
    });

    describe(`"${ADD_WRESTLER} action`, () => {
      test('adds the new wrestler to state.', () => {
        expect(state).toEqual({
          byId: {},
          allIds: [],
        });
        state = reducer(state, setWrestlersAction);
        expect(reducer(state, addWrestlerAction)).toEqual({
          byId: {
            1: {
              id: 1,
              name: 'Stone Cold Steve Austin',
            },
            2: {
              id: 2,
              name: 'The Rock',
            },
            3: {
              id: 3,
              name: 'The Heartbreak Kid Shawn Michaels',
            },
          },
          allIds: [1, 2, 3],
        });
      });
    });

    describe('unrecognized action', () => {
      test('returns current state.', () => {
        expect(state).toEqual({
          byId: {},
          allIds: [],
        });
        state = reducer(state, setWrestlersAction);
        expect(reducer(state, unrecognizedAction)).toEqual({
          byId: {
            1: {
              id: 1,
              name: 'Stone Cold Steve Austin',
            },
            2: {
              id: 2,
              name: 'The Rock',
            },
          },
          allIds: [1, 2],
        });
      });
    });
  });

  describe('selectors', () => {
    beforeEach(() => {
      state = reducer(state, setWrestlersAction);
    });

    describe('getWrestler', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getWrestler(state, 1)).toEqual({
          id: 1,
          name: 'Stone Cold Steve Austin',
        });
      });
    });

    describe('getWrestlerIds', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getWrestlerIds(state)).toEqual([1, 2]);
      });
    });

    describe('getWrestlersAsArray', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getWrestlersAsArray(state)).toEqual([
          {
            id: 1,
            name: 'Stone Cold Steve Austin',
          },
          {
            id: 2,
            name: 'The Rock',
          },
        ]);
      });
    });

    describe('getWrestlersAsMap', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getWrestlersAsMap(state)).toEqual({
          1: {
            id: 1,
            name: 'Stone Cold Steve Austin',
          },
          2: {
            id: 2,
            name: 'The Rock',
          },
        });
      });
    });
  });
});
