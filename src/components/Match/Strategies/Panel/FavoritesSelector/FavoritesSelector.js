import _ from 'lodash';
import { SingleSelect } from 'lucid';
import React from 'react';

const {
	func,
	number,
} = React.PropTypes;

const favorites = _.range(0, 3);

const FavoritesSelector = ({
	selectedIndex = 0,
	onSelect = _.noop,
}) => (
	<SingleSelect
		hasReset={false}
		selectedIndex={selectedIndex}
		onSelect={onSelect}
	>
		{_.map(favorites, (favorite) => (
			<SingleSelect.Option key={favorite}>{favorite}</SingleSelect.Option>
		))}
	</SingleSelect>
);

FavoritesSelector.propTypes = {
	selectedIndex: number,
	onSelect: func,
};

export default FavoritesSelector;
