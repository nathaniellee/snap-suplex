import _ from 'lodash';
import { SingleSelect } from 'lucid';
import React from 'react';
import statMap from '../../../constants/statMap';

const {
	func,
	string,
} = React.PropTypes;

const getStat = (id) => _.find(statMap.byId, { id }).value;

export default React.createClass({
	propTypes: {
		stat: string,
		onChange: func,
	},

	getDefaultProps() {
		const id = _.head(statMap.allIds);
		const stat = getStat(id);
		return {
			stat,
			onChange: _.noop,
		};
	},

	onSelect(selectedIndex) {
		const id = statMap.allIds[selectedIndex];
		const stat = getStat(id);
		this.props.onChange(stat);
	},

	render() {
		const { stat } = this.props;
		const id = _.find(statMap.byId, { value: stat }).id;
		const selectedIndex = _.indexOf(statMap.allIds, id);
		const stats = _.chain(statMap.allIds)
			.map((id) => _.get(statMap, `byId.${id}.value`))
			.without('sta')
			.value();

		return (
			<SingleSelect
				hasReset={false}
				selectedIndex={selectedIndex}
				onSelect={this.onSelect}
			>
				{_.map(stats, (stat) => (
					<SingleSelect.Option key={stat}>{_.upperCase(stat)}</SingleSelect.Option>
				))}
			</SingleSelect>
		);
	},
});
