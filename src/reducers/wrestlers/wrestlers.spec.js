import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import reducer, { selectors } from './wrestlers';

const {
  ADD_WRESTLER,
  SET_WRESTLERS,
} = actionTypes;

describe('wrestlers', () => {
  let initialState;
  let setWrestlersAction;

  beforeEach(() => {
    initialState = reducer(undefined, {});
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
  });

  describe('reducers', () => {
    describe('default state', () => {
      test('returns an empty object.', () => {
        expect(initialState).toEqual({});
      });
    });

    describe(`"${SET_WRESTLERS}" action`, () => {
      test('converts the provided array of wrestlers into a map keyed by id.', () => {
        expect(reducer(initialState, setWrestlersAction)).toEqual({
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

    describe(`"${ADD_WRESTLER} action`, () => {
      test('assigns a new id to the provided wrestler and adds it to the map in state.', () => {
        const updatedState = reducer(initialState, setWrestlersAction);
        const addWrestlerAction = {
          type: ADD_WRESTLER,
          wrestler: { name: 'The Heartbreak Kid Shawn Michaels' },
        };

        expect(reducer(updatedState, addWrestlerAction)).toEqual({
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
        });
      });
    });

    describe('unrecognized action', () => {
      test('returns current state.', () => {
        const updatedState = reducer(initialState, setWrestlersAction);
        const unrecognizedAction = { type: 'unrecognized action' };

        expect(reducer(updatedState, unrecognizedAction)).toEqual({
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

  describe('selectors', () => {
    let updatedState;

    beforeEach(() => {
      updatedState = reducer(initialState, setWrestlersAction);
    });

    describe('getWrestler', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getWrestler(updatedState, 1)).toEqual({
          id: 1,
          name: 'Stone Cold Steve Austin',
        });
      });
    });

    describe('getWrestlersAsArray', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getWrestlersAsArray(updatedState)).toEqual([
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
        expect(selectors.getWrestlersAsMap(updatedState)).toEqual({
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
