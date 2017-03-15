import _ from 'lodash';
import {
	Grid,
	RadioGroup,
} from 'lucid';
import React from 'react';
import { defaultNumRounds } from '../../../constants/defaults';
import numRoundsOptions from '../../../constants/numRoundsOptions';
import './Parameters.css';

const {
	func,
	oneOf,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		numRounds: oneOf(numRoundsOptions),
		onChangeNumRounds: func,
	},

	getDefaultProps() {
		return {
			numRounds: defaultNumRounds,
			onChangeNumRounds: _.noop,
		};
	},

	onChangeNumRounds(selectedIndex) {
		this.props.onChangeNumRounds(numRoundsOptions[selectedIndex]);
	},

	render() {
		const { numRounds } = this.props;
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
						className='Parameters-num-rounds-label'
						is2
					>
						Number of rounds:
					</Grid.Cell>
					<Grid.Cell
						className='Parameters-num-rounds-input'
						is10
					>
						<RadioGroup
							selectedIndex={_.indexOf(numRoundsOptions, numRounds)}
							onSelect={this.onChangeNumRounds}
						>
							{_.map(numRoundsOptions, (option) => (
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
