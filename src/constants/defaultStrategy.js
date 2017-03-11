import _ from 'lodash';
import favoritesMap from './favoritesMap';
import roundLevelMap from './roundLevelMap';
import statMap from './statMap';

const favorites = _.map(favoritesMap.allIds, (id) =>
  _.find(favoritesMap.byId, { id }).value);
const roundLevels = _.map(roundLevelMap.allIds, (id) =>
  _.find(roundLevelMap.byId, { id }).value);
const stats = _.chain(statMap.allIds)
  .map((id) => _.find(statMap.byId, { id }).value)
  .reject((value) => value === 'sta')
  .value();

const defaultStrategy = {
  flag: null,
  level: _.head(roundLevels),
  numFavorites: _.head(favorites),
  stat: _.head(stats),
  targetStat: null,
};

export default (count) => {
  const range = _.range(1, count + 1);
  return _.reduce(range, (results) => [
    ...results,
    { ...defaultStrategy },
  ], []);
};
