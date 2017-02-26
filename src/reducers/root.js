import _ from 'lodash';
import { combineReducers } from 'redux';
import match, { selectors as matchSelectors } from './match/match';
import wrestlers, { selectors as wrestlersSelectors } from './wrestlers/wrestlers';

const root = combineReducers({
  match,
  wrestlers,
});

export default root;
export const selectors = {
  get: _.identity,
  getMatch: (state) => matchSelectors.get(state.match),
  getWrestler: (state, id) => wrestlersSelectors.getWrestler(state.wrestlers, id),
  getWrestlerIds: (state) => wrestlersSelectors.getWrestlerIds(state.wrestlers),
  getWrestlersAsArray: (state) => wrestlersSelectors.getWrestlersAsArray(state.wrestlers),
  getWrestlersAsMap: (state) => wrestlersSelectors.getWrestlersAsMap(state.wrestlers),
};
