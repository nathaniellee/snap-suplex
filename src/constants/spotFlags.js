import _ from 'lodash';

export default _.reduce([
	'highrisk',
	'illegal',
	'pinning',
	'stiff',
	'submission',
], (results, flag) => ({
	...results,
	[flag]: flag,
}), {});
