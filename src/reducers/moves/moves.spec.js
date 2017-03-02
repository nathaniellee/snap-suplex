import _ from 'lodash';
import actionTypes from '../../actions/actionTypes';
import reducer, { selectors } from './moves';

const {
  ADD_MOVE,
  SET_MOVES,
  UPDATE_MOVE,
} = actionTypes;

describe('moves', () => {
  let state;
  let addMoveAction;
  let setMovesAction;
  let updateFoundMoveAction;
  let updateNotFoundMoveAction;
  let unrecognizedAction;

  beforeEach(() => {
    state = reducer(undefined, {});
    addMoveAction = {
      type: ADD_MOVE,
      move: { description: 'Sweet Chin Music' },
    };
    setMovesAction = {
      type: SET_MOVES,
      moves: {
        byId: {
          1: {
            id: 1,
            description: 'Stone Cold Stunner',
          },
          2: {
            id: 2,
            description: 'Rock Bottom',
          },
        },
        allIds: [1, 2],
      },
    };
    updateFoundMoveAction = {
      type: UPDATE_MOVE,
      move: {
        id: 1,
        description: 'tombstone piledriver',
      },
    };
    updateNotFoundMoveAction = {
      type: UPDATE_MOVE,
      move: {
        id: 5,
        description: 'Mick Foley'
      },
    };
    unrecognizedAction = { type: 'unrecognized action' };
  });

  describe('reducers', () => {
    describe(`"${SET_MOVES}" action`, () => {
      test('replaces state with the new moves.', () => {
        expect(state).toEqual({
          byId: {},
          allIds: [],
        });
        expect(reducer(state, setMovesAction)).toEqual({
          byId: {
            1: {
              id: 1,
              description: 'Stone Cold Stunner',
            },
            2: {
              id: 2,
              description: 'Rock Bottom',
            },
          },
          allIds: [1, 2],
        });
      });
    });

    describe(`"${ADD_MOVE} action`, () => {
      test('adds the new move to state.', () => {
        expect(state).toEqual({
          byId: {},
          allIds: [],
        });
        state = reducer(state, setMovesAction);
        expect(reducer(state, addMoveAction)).toEqual({
          byId: {
            1: {
              id: 1,
              description: 'Stone Cold Stunner',
            },
            2: {
              id: 2,
              description: 'Rock Bottom',
            },
            3: {
              id: 3,
              description: 'Sweet Chin Music',
            },
          },
          allIds: [1, 2, 3],
        });
      });
    });

    describe(`"${UPDATE_MOVE} action`, () => {
      describe('move is found in state', () => {
        test('updates move in state with new data.', () => {
          expect(state).toEqual({
            byId: {},
            allIds: [],
          });
          state = reducer(state, setMovesAction);
          expect(state).toEqual({
            byId: {
              1: {
                id: 1,
                description: 'Stone Cold Stunner',
              },
              2: {
                id: 2,
                description: 'Rock Bottom',
              },
            },
            allIds: [1, 2],
          });
          state = reducer(state, updateFoundMoveAction);
          expect(state).toEqual({
            byId: {
              1: {
                id: 1,
                description: 'tombstone piledriver',
              },
              2: {
                id: 2,
                description: 'Rock Bottom',
              },
            },
            allIds: [1, 2],
          });
        });
      });

      describe('move is not found in state', () => {
        test('returns current state.', () => {
          expect(state).toEqual({
            byId: {},
            allIds: [],
          });
          state = reducer(state, setMovesAction);
          expect(state).toEqual({
            byId: {
              1: {
                id: 1,
                description: 'Stone Cold Stunner',
              },
              2: {
                id: 2,
                description: 'Rock Bottom',
              },
            },
            allIds: [1, 2],
          });
          state = reducer(state, updateNotFoundMoveAction);
          expect(state).toEqual({
            byId: {
              1: {
                id: 1,
                description: 'Stone Cold Stunner',
              },
              2: {
                id: 2,
                description: 'Rock Bottom',
              },
            },
            allIds: [1, 2],
          });
        });
      });
    });

    describe('unrecognized action', () => {
      test('returns current state.', () => {
        expect(state).toEqual({
          byId: {},
          allIds: [],
        });
        state = reducer(state, setMovesAction);
        expect(reducer(state, unrecognizedAction)).toEqual({
          byId: {
            1: {
              id: 1,
              description: 'Stone Cold Stunner',
            },
            2: {
              id: 2,
              description: 'Rock Bottom',
            },
          },
          allIds: [1, 2],
        });
      });
    });
  });

  describe('selectors', () => {
    beforeEach(() => {
      state = reducer(state, setMovesAction);
    });

    describe('getMove', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getMove(state, 1)).toEqual({
          id: 1,
          description: 'Stone Cold Stunner',
        });
      });
    });

    describe('getMoveIds', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getMoveIds(state)).toEqual([1, 2]);
      });
    });

    describe('getMovesAsArray', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getMovesAsArray(state)).toEqual([
          {
            id: 1,
            description: 'Stone Cold Stunner',
          },
          {
            id: 2,
            description: 'Rock Bottom',
          },
        ]);
      });
    });

    describe('getMovesAsMap', () => {
      test('returns the appropriate state.', () => {
        expect(selectors.getMovesAsMap(state)).toEqual({
          1: {
            id: 1,
            description: 'Stone Cold Stunner',
          },
          2: {
            id: 2,
            description: 'Rock Bottom',
          },
        });
      });
    });
  });
});
