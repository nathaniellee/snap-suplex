import _ from 'lodash';
import { combineReducers } from 'redux';
import match, * as fromMatch from './match/match';
import wrestlers, { selectors as wrestlersSelectors } from './wrestlers/wrestlers';

const root = combineReducers({
  match,
  wrestlers,
});

export default root;
export const selectors = {
  get: _.identity,
  match: {
    getMaxRounds: (state) => fromMatch.getMaxRounds(state.match),
    getRoundNumber: (state) => fromMatch.getRoundNumber(state.match),
    getWrestlers: (state) => fromMatch.getWrestlers(state.match),
  },
  wrestlers: {
    getWrestler: (state, id) => wrestlersSelectors.getWrestler(state.wrestlers, id),
    getWrestlersAsArray: (state) => wrestlersSelectors.getWrestlersAsArray(state.wrestlers),
    getWrestlersAsMap: (state) => wrestlersSelectors.getWrestlersAsMap(state.wrestlers),
  },
};
