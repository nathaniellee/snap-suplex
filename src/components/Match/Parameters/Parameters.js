import _ from 'lodash';
import {
	Grid,
	RadioGroup,
} from 'lucid';
import React from 'react';
import './Parameters.css';

const {
	func,
	oneOf,
} = React.PropTypes;

const maxRoundsOptions = _.range(10, 70, 10);

export default React.createClass({
	propTypes: {
		maxRounds: oneOf(maxRoundsOptions),
		onChangeMaxRounds: func,
	},

	getDefaultProps() {
		return {
			maxRounds: 10,
			onChangeMaxRounds: _.noop,
		};
	},

	onChangeMaxRounds(selectedIndex) {
		this.props.onChangeMaxRounds(maxRoundsOptions[selectedIndex]);
	},

	render() {
		const {
			maxRounds,
		} = this.props;

		return (
			<div className='Parameters'>
				<Grid isGutterless>
					<Grid.Cell
						className='Parameters-match-type-label'
						is2
					>
						Match type:
					</Grid.Cell>
					<Grid.Cell
						className='Parameters-match-type-input'
						is10
					>
						<RadioGroup
							selectedIndex={0}
							onSelect={_.noop}
						>
							<RadioGroup.RadioButton>
								<RadioGroup.Label>Singles</RadioGroup.Label>
							</RadioGroup.RadioButton>
							<RadioGroup.RadioButton isDisabled>
								<RadioGroup.Label>Tag Team</RadioGroup.Label>
							</RadioGroup.RadioButton>
						</RadioGroup>
					</Grid.Cell>
				</Grid>
				<Grid isGutterless>
					<Grid.Cell
						className='Parameters-max-rounds-label'
						is2
					>
						Number of rounds:
					</Grid.Cell>
					<Grid.Cell
						className='Parameters-max-rounds-input'
						is10
					>
						<RadioGroup
							selectedIndex={_.indexOf(maxRoundsOptions, maxRounds)}
							onSelect={this.onChangeMaxRounds}
						>
							{_.map(maxRoundsOptions, (option) => (
								<RadioGroup.RadioButton
									key={option}
								>
									<RadioGroup.Label>{option}</RadioGroup.Label>
								</RadioGroup.RadioButton>
							))}
						</RadioGroup>
					</Grid.Cell>
				</Grid>
			</div>
		);
	},
});
