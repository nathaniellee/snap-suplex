import _ from 'lodash';
import { combineReducers } from 'redux';
import match, { selectors as matchSelectors } from './match/match';
import moves, { selectors as movesSelectors } from './moves/moves';
import wrestlers, { selectors as wrestlersSelectors } from './wrestlers/wrestlers';

const root = combineReducers({
  match,
  moves,
  wrestlers,
});

export default root;
export const selectors = {
  get: _.identity,
  getMatch: (state) => matchSelectors.get(state.match),
  getMove: (state, id) => movesSelectors.getMove(state.moves, id),
  getMoveIds: (state) => movesSelectors.getMoveIds(state.moves),
  getMovesAsArray: (state) => movesSelectors.getMovesAsArray(state.moves),
  getMovesAsMap: (state) => movesSelectors.getMovesAsMap(state.moves),
  getWrestler: (state, id) => wrestlersSelectors.getWrestler(state.wrestlers, id),
  getWrestlerIds: (state) => wrestlersSelectors.getWrestlerIds(state.wrestlers),
  getWrestlersAsArray: (state) => wrestlersSelectors.getWrestlersAsArray(state.wrestlers),
  getWrestlersAsMap: (state) => wrestlersSelectors.getWrestlersAsMap(state.wrestlers),
};
