import _ from 'lodash';
import { combineReducers } from 'redux';
import match, { selectors as matchSelectors } from './match/match';
import matchSetup, { selectors as matchSetupSelectors } from './matchSetup/matchSetup';
import moves, { selectors as movesSelectors } from './moves/moves';
import wrestlers, { selectors as wrestlersSelectors } from './wrestlers/wrestlers';

const root = combineReducers({
  match,
  matchSetup,
  moves,
  wrestlers,
});

const getMove = (state, id) => movesSelectors.getMove(state.moves, id);

const getWrestlerMoves = (wrestler, state) => {
  return _.reduce(wrestler.moves, (results, moveIds, statKey) => {
    return {
      ...results,
      [statKey]: _.map(moveIds, (moveId) => getMove(state, moveId)),
    };
  }, {});
};

export default root;
export const selectors = {
  get: _.identity,
  getMatch: (state) => matchSelectors.get(state.match),
  getMatchSetup: (state) => matchSetupSelectors.get(state.matchSetup),
  getMaxRounds: (state) => matchSetupSelectors.getMaxRounds(state.matchSetup),
  getStrategies: (state) => matchSetupSelectors.getStrategies(state.matchSetup),
  getStrategyByWrestlerId: (state, wrestlerId) =>
    matchSetupSelectors.getStrategyByWrestlerId(state.matchSetup, wrestlerId),
  getMove,
  getMoveIds: (state) => movesSelectors.getMoveIds(state.moves),
  getMovesAsArray: (state) => movesSelectors.getMovesAsArray(state.moves),
  getMovesAsMap: (state) => movesSelectors.getMovesAsMap(state.moves),
  getWrestler: (state, id) => {
    const wrestler = wrestlersSelectors.getWrestler(state.wrestlers, id);
    return {
      wrestler: _.isNull(wrestler)
        ? null
        : {
          ...wrestler,
          moves: getWrestlerMoves(wrestler, state),
        },
    };
  },
  getWrestlerIds: (state) => wrestlersSelectors.getWrestlerIds(state.wrestlers),
  getWrestlersAsArray: (state) => wrestlersSelectors.getWrestlersAsArray(state.wrestlers),
  getWrestlersAsMap: (state) => wrestlersSelectors.getWrestlersAsMap(state.wrestlers),
};
