import _ from 'lodash';
import { SingleSelect } from 'lucid';
import React from 'react';
import statMap from '../../../constants/statMap';

const {
	func,
	string,
} = React.PropTypes;

const getStat = (id) => _.find(statMap.byId, { id }).value;

const getSelectedIndex = (stat) => {
	if (_.isNull(stat)) {
		return null;
	}

	const id = _.find(statMap.byId, { value: stat }).id;
	return _.indexOf(statMap.allIds, id);
};

export default React.createClass({
	propTypes: {
		targetStat: string,
		onChange: func,
	},

	getDefaultProps() {
		const id = _.head(statMap.allIds);
		const targetStat = getStat(id);
		return {
			targetStat,
			onChange: _.noop,
		};
	},

	onSelect(selectedIndex) {
		if (_.isNull(selectedIndex)) {
			this.props.onChange(null);
		} else {
			const id = statMap.allIds[selectedIndex];
			const targetStat = getStat(id);
			this.props.onChange(targetStat);
		}
	},

	render() {
		const { targetStat } = this.props;
		const selectedIndex = _.isNull(targetStat)
			? null
			: getSelectedIndex(targetStat);
		const stats = _.chain(statMap.allIds)
			.map((id) => _.get(statMap, `byId.${id}.value`))
			.without('sta')
			.value();

		return (
			<SingleSelect
				selectedIndex={selectedIndex}
				onSelect={this.onSelect}
			>
				<SingleSelect.Placeholder>None</SingleSelect.Placeholder>
				{_.map(stats, (stat) => (
					<SingleSelect.Option key={stat}>{_.upperCase(stat)}</SingleSelect.Option>
				))}
			</SingleSelect>
		);
	},
});

