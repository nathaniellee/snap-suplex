import _ from 'lodash';
import {
	Grid,
	RadioGroup,
} from 'lucid';
import React from 'react';
import './StatField.css';

const {
	func,
	number,
	string,
} = React.PropTypes;

const statRange = _.range(1, 9);

export default React.createClass({
	propTypes: {
		cost: number,
		label: string,
		value: number,
		onChange: func,
	},

	getDefaultProps() {
		return {
			onChange: _.noop,
		};
	},

	onSelect(selectedIndex) {
		this.props.onChange(statRange[selectedIndex]);
	},

	render() {
		const {
			cost,
			label,
			value,
		} = this.props;

		return (
			<Grid
				className='StatField'
				isGutterless
			>
				<Grid.Cell
					className='StatField-label'
					is2
				>
					{`${label}:`}
				</Grid.Cell>
				<Grid.Cell
					className='StatField-input'
					is9
				>
					<RadioGroup
						selectedIndex={_.indexOf(statRange, value)}
						onSelect={this.onSelect}
					>
						{_.map(statRange, (statValue) => (
							<RadioGroup.RadioButton key={statValue}>
								<RadioGroup.Label>{statValue}</RadioGroup.Label>
							</RadioGroup.RadioButton>
						))}
					</RadioGroup>
				</Grid.Cell>
				<Grid.Cell className='StatField-cost'>
					<span>Cost:</span>
					<span>{cost}</span>
				</Grid.Cell>
			</Grid>
		);
	},
});
