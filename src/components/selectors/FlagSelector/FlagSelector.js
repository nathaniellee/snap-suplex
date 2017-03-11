import _ from 'lodash';
import { SingleSelect } from 'lucid';
import React from 'react';
import spotFlagsMap from '../../../constants/spotFlagsMap';

const {
	func,
	string,
} = React.PropTypes;

const getFlag = (id) => _.find(spotFlagsMap.byId, { id }).value;

const getSelectedIndex = (flag) => {
	if (_.isNull(flag)) {
		return null;
	}

	const id = _.find(spotFlagsMap.byId, { value: flag }).id;
	return _.indexOf(spotFlagsMap.allIds, id);
};

export default React.createClass({
	propTypes: {
		flag: string,
		onChange: func,
	},

	getDefaultProps() {
		const id = _.head(spotFlagsMap.allIds);
		const flag = getFlag(id);
		return {
			flag,
			onChange: _.noop,
		};
	},

	onSelect(selectedIndex) {
		const id = spotFlagsMap.allIds[selectedIndex];
		const flag = getFlag(id);
		this.props.onChange(flag);
	},

	render() {
		const { flag } = this.props;
		const selectedIndex = getSelectedIndex(flag);

		return (
			<SingleSelect
				selectedIndex={selectedIndex}
				onSelect={this.onSelect}
			>
				<SingleSelect.Placeholder>None</SingleSelect.Placeholder>
				{_.map(spotFlagsMap.allIds, (id) => {
					const {
						label,
						value,
					} = spotFlagsMap.byId[id];
					return <SingleSelect.Option key={value}>{label}</SingleSelect.Option>;
				})}
			</SingleSelect>
		);
	},
});
