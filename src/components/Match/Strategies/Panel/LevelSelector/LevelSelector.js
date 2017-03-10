import _ from 'lodash';
import { SingleSelect } from 'lucid';
import React from 'react';

const {
	func,
	number,
} = React.PropTypes;

const levels = _.range(1, 5);

const LevelSelector = ({
	selectedIndex = 0,
	onSelect = _.noop,
}) => (
	<SingleSelect
		hasReset={false}
		selectedIndex={selectedIndex}
		onSelect={onSelect}
	>
		{_.map(levels, (level) => (
			<SingleSelect.Option key={level}>{level}</SingleSelect.Option>
		))}
	</SingleSelect>
);

LevelSelector.propTypes = {
	selectedIndex: number,
	onSelect: func,
};

export default LevelSelector;
