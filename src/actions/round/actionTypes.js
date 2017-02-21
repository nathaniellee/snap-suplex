import _ from 'lodash';

export default _.reduce([
	'SET_ATTACKER',
	'SET_ATTACKER_STRATEGY',
	'SET_ATTACKER_STAT_ROLL',
	'SET_DEFENDER',
	'SET_DEFENDER_STRATEGY',
	'SET_DEFENDER_STAT_ROLL',
	'SET_WINNER',
	'START_ROUND',
	'END_ROUND',
], (actionTypes, type) => ({
	...actionTypes,
	[type]: type,
}), {});
