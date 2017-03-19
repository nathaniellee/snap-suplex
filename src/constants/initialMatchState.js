import {
  defaultDqRating,
  defaultNumRounds,
  defaultRefScore,
} from './defaults';

export default {
  attackerId: null,
  defenderId: null,
  dqRating: defaultDqRating,
  numRounds: defaultNumRounds,
  pageIndex: 0,
  refScore: defaultRefScore,
  roundNumber: null,
  rounds: [],
  strategies: null,
  wrestlers: {},   // Maybe this should also start off null...
};
