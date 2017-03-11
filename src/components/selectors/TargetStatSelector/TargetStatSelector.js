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
		const id = statMap.allIds[selectedIndex];
		const targetStat = getStat(id);
		this.props.onChange(targetStat);
	},

	render() {
		const { targetStat } = this.props;
		const selectedIndex = getSelectedIndex(targetStat);

		return (
			<SingleSelect
				selectedIndex={selectedIndex}
				onSelect={this.onSelect}
			>
				<SingleSelect.Placeholder>None</SingleSelect.Placeholder>
				{_.map(statMap.allIds, (id) => {
					const { value } = statMap.byId[id];
					return <SingleSelect.Option key={value}>{_.upperCase(value)}</SingleSelect.Option>;
				})}
			</SingleSelect>
		);
	},
});

