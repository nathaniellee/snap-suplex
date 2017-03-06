import _ from 'lodash';
import {
	Grid,
	RadioGroup,
	TextField,
} from 'lucid';
import React from 'react';
import './MoveField.css';

const {
	func,
	number,
	string,
} = React.PropTypes;

const favoriteRange = _.range(0, 3);

export default React.createClass({
	propTypes: {
		description: string,
		favoriteTags: number,
		label: string,
		onChangeDescription: func,
		onChangeFavorites: func,
	},

	getDefaultProps() {
		return {
			description: '',
			favoriteTags: 0,
			label: '',
			onChangeDescription: _.noop,
			onChangeFavorites: _.noop,
		};
	},

	onSelect(selectedIndex) {
		this.props.onChangeFavorites(favoriteRange[selectedIndex]);
	},

	render() {
		const {
			description,
			favoriteTags,
			label,
			onChangeDescription,
		} = this.props;

		return (
			<Grid
				className='MoveField'
				isGutterless
			>
				<Grid.Cell
					className='MoveField-label'
					is2
				>
					{`${label}:`}
				</Grid.Cell>
				<Grid.Cell
					className='MoveField-input'
					is6
				>
					<TextField
						value={description}
						onChange={onChangeDescription}
					/>
				</Grid.Cell>
				<Grid.Cell
					className='MoveField-favorite-label'
					is2
				>
					Favorite Tags:
				</Grid.Cell>
				<Grid.Cell
					className='MoveField-input'
					is2
				>
					<RadioGroup
						selectedIndex={_.indexOf(favoriteRange, favoriteTags)}
						onSelect={this.onSelect}
					>
						{_.map(favoriteRange, (favoriteValue) => (
							<RadioGroup.RadioButton key={favoriteValue}>
								<RadioGroup.Label>{favoriteValue}</RadioGroup.Label>
							</RadioGroup.RadioButton>
						))}
					</RadioGroup>
				</Grid.Cell>
			</Grid>
		);
	},
});
