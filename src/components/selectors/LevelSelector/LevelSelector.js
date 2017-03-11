import _ from 'lodash';
import { SingleSelect } from 'lucid';
import React from 'react';
import roundLevelMap from '../../../constants/roundLevelMap';

const {
	func,
	number,
} = React.PropTypes;

const getLevel = (id) => _.find(roundLevelMap.byId, { id }).value;

export default React.createClass({
	propTypes: {
		level: number,
		onChange: func,
	},

	getDefaultProps() {
		const id = _.head(roundLevelMap.allIds);
		const level = getLevel(id);
		return {
			level,
			onChange: _.noop,
		};
	},

	onSelect(selectedIndex) {
		const id = roundLevelMap.allIds[selectedIndex];
		const level = getLevel(id);
		this.props.onChange(level);
	},

	render() {
		const { level } = this.props;
		const id = _.find(roundLevelMap.byId, { value: level }).id;
		const selectedIndex = _.indexOf(roundLevelMap.allIds, id);

		return (
			<SingleSelect
				hasReset={false}
				selectedIndex={selectedIndex}
				onSelect={this.onSelect}
			>
				{_.map(roundLevelMap.allIds, (id) => {
					const {
						label,
						value,
					} = roundLevelMap.byId[id];
					return <SingleSelect.Option key={value}>{label}</SingleSelect.Option>;
				})}
			</SingleSelect>
		);
	},
});
