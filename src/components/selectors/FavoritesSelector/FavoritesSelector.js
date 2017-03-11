import _ from 'lodash';
import { SingleSelect } from 'lucid';
import React from 'react';
import favoritesMap from '../../../constants/favoritesMap';

const {
	func,
	number,
} = React.PropTypes;

const getNumFavorites = (id) => _.find(favoritesMap.byId, { id }).value;

export default React.createClass({
	propTypes: {
		numFavorites: number,
		onChange: func,
	},

	getDefaultProps() {
		const id = _.head(favoritesMap.allIds);
		const numFavorites = getNumFavorites(id);
		return {
			numFavorites,
			onChange: _.noop,
		};
	},

	onSelect(selectedIndex) {
		const id = favoritesMap.allIds[selectedIndex];
		const numFavorites = getNumFavorites(id);
		this.props.onChange(numFavorites);
	},

	render() {
		const { numFavorites } = this.props;
		const id = _.find(favoritesMap.byId, { value: numFavorites }).id;
		const selectedIndex = _.indexOf(favoritesMap.allIds, id);

		return (
			<SingleSelect
				hasReset={false}
				selectedIndex={selectedIndex}
				onSelect={this.onSelect}
			>
				{_.map(favoritesMap.allIds, (id) => {
					const {
						label,
						value,
					} = favoritesMap.byId[id];
					return <SingleSelect.Option key={value}>{label}</SingleSelect.Option>;
				})}
			</SingleSelect>
		);
	},
});
